import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IFacilities, Facilities } from 'app/shared/model/facilities.model';
import { FacilitiesService } from './facilities.service';
import { IHotel } from 'app/shared/model/hotel.model';
import { HotelService } from 'app/entities/hotel';

@Component({
  selector: 'jhi-facilities-update',
  templateUrl: './facilities-update.component.html'
})
export class FacilitiesUpdateComponent implements OnInit {
  isSaving: boolean;

  hotels: IHotel[];

  editForm = this.fb.group({
    id: [],
    type: [],
    hotel: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected facilitiesService: FacilitiesService,
    protected hotelService: HotelService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ facilities }) => {
      this.updateForm(facilities);
    });
    this.hotelService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IHotel[]>) => mayBeOk.ok),
        map((response: HttpResponse<IHotel[]>) => response.body)
      )
      .subscribe((res: IHotel[]) => (this.hotels = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(facilities: IFacilities) {
    this.editForm.patchValue({
      id: facilities.id,
      type: facilities.type,
      hotel: facilities.hotel
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const facilities = this.createFromForm();
    if (facilities.id !== undefined) {
      this.subscribeToSaveResponse(this.facilitiesService.update(facilities));
    } else {
      this.subscribeToSaveResponse(this.facilitiesService.create(facilities));
    }
  }

  private createFromForm(): IFacilities {
    return {
      ...new Facilities(),
      id: this.editForm.get(['id']).value,
      type: this.editForm.get(['type']).value,
      hotel: this.editForm.get(['hotel']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFacilities>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackHotelById(index: number, item: IHotel) {
    return item.id;
  }
}
