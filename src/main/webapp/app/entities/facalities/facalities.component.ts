import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFacalities } from 'app/shared/model/facalities.model';
import { AccountService } from 'app/core';
import { FacalitiesService } from './facalities.service';

@Component({
  selector: 'jhi-facalities',
  templateUrl: './facalities.component.html'
})
export class FacalitiesComponent implements OnInit, OnDestroy {
  facalities: IFacalities[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected facalitiesService: FacalitiesService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.facalitiesService
      .query()
      .pipe(
        filter((res: HttpResponse<IFacalities[]>) => res.ok),
        map((res: HttpResponse<IFacalities[]>) => res.body)
      )
      .subscribe(
        (res: IFacalities[]) => {
          this.facalities = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInFacalities();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IFacalities) {
    return item.id;
  }

  registerChangeInFacalities() {
    this.eventSubscriber = this.eventManager.subscribe('facalitiesListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
