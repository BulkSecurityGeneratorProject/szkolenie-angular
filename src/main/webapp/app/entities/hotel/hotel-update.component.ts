import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IHotel, Hotel } from 'app/shared/model/hotel.model';
import { HotelService } from './hotel.service';

@Component({
  selector: 'jhi-hotel-update',
  templateUrl: './hotel-update.component.html'
})
export class HotelUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [],
    location: []
  });

  constructor(protected hotelService: HotelService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ hotel }) => {
      this.updateForm(hotel);
    });
  }

  updateForm(hotel: IHotel) {
    this.editForm.patchValue({
      id: hotel.id,
      name: hotel.name,
      location: hotel.location
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const hotel = this.createFromForm();
    if (hotel.id !== undefined) {
      this.subscribeToSaveResponse(this.hotelService.update(hotel));
    } else {
      this.subscribeToSaveResponse(this.hotelService.create(hotel));
    }
  }

  private createFromForm(): IHotel {
    return {
      ...new Hotel(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      location: this.editForm.get(['location']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHotel>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
