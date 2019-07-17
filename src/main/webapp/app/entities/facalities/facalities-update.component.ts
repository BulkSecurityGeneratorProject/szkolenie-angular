import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IFacalities, Facalities } from 'app/shared/model/facalities.model';
import { FacalitiesService } from './facalities.service';
import { IHotel } from 'app/shared/model/hotel.model';
import { HotelService } from 'app/entities/hotel';

@Component({
  selector: 'jhi-facalities-update',
  templateUrl: './facalities-update.component.html'
})
export class FacalitiesUpdateComponent implements OnInit {
  isSaving: boolean;

  hotels: IHotel[];

  editForm = this.fb.group({
    id: [],
    type: [],
    hotel: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected facalitiesService: FacalitiesService,
    protected hotelService: HotelService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ facalities }) => {
      this.updateForm(facalities);
    });
    this.hotelService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IHotel[]>) => mayBeOk.ok),
        map((response: HttpResponse<IHotel[]>) => response.body)
      )
      .subscribe((res: IHotel[]) => (this.hotels = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(facalities: IFacalities) {
    this.editForm.patchValue({
      id: facalities.id,
      type: facalities.type,
      hotel: facalities.hotel
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const facalities = this.createFromForm();
    if (facalities.id !== undefined) {
      this.subscribeToSaveResponse(this.facalitiesService.update(facalities));
    } else {
      this.subscribeToSaveResponse(this.facalitiesService.create(facalities));
    }
  }

  private createFromForm(): IFacalities {
    return {
      ...new Facalities(),
      id: this.editForm.get(['id']).value,
      type: this.editForm.get(['type']).value,
      hotel: this.editForm.get(['hotel']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFacalities>>) {
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
