import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IHotel, Hotel } from 'app/shared/model/hotel.model';
import { HotelService } from './hotel.service';
import { IRoom } from 'app/shared/model/room.model';
import { RoomService } from 'app/entities/room';

@Component({
  selector: 'jhi-hotel-update',
  templateUrl: './hotel-update.component.html'
})
export class HotelUpdateComponent implements OnInit {
  isSaving: boolean;

  rooms: IRoom[];

  editForm = this.fb.group({
    id: [],
    name: [],
    location: [],
    rooms: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected hotelService: HotelService,
    protected roomService: RoomService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ hotel }) => {
      this.updateForm(hotel);
    });
    this.roomService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IRoom[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRoom[]>) => response.body)
      )
      .subscribe((res: IRoom[]) => (this.rooms = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(hotel: IHotel) {
    this.editForm.patchValue({
      id: hotel.id,
      name: hotel.name,
      location: hotel.location,
      rooms: hotel.rooms
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
      location: this.editForm.get(['location']).value,
      rooms: this.editForm.get(['rooms']).value
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
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackRoomById(index: number, item: IRoom) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
