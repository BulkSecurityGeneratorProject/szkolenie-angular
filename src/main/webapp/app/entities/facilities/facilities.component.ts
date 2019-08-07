import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFacilities } from 'app/shared/model/facilities.model';
import { AccountService } from 'app/core';
import { FacilitiesService } from './facilities.service';

@Component({
  selector: 'jhi-facilities',
  templateUrl: './facilities.component.html'
})
export class FacilitiesComponent implements OnInit, OnDestroy {
  facilities: IFacilities[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected facilitiesService: FacilitiesService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.facilitiesService
      .query()
      .pipe(
        filter((res: HttpResponse<IFacilities[]>) => res.ok),
        map((res: HttpResponse<IFacilities[]>) => res.body)
      )
      .subscribe(
        (res: IFacilities[]) => {
          this.facilities = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInFacilities();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IFacilities) {
    return item.id;
  }

  registerChangeInFacilities() {
    this.eventSubscriber = this.eventManager.subscribe('facilitiesListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
