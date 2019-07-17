import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRoom, Room } from 'app/shared/model/room.model';
import { RoomService } from './room.service';
import { IHotel } from 'app/shared/model/hotel.model';
import { HotelService } from 'app/entities/hotel';
import { IBooking } from 'app/shared/model/booking.model';
import { BookingService } from 'app/entities/booking';

@Component({
  selector: 'jhi-room-update',
  templateUrl: './room-update.component.html'
})
export class RoomUpdateComponent implements OnInit {
  isSaving: boolean;

  hotels: IHotel[];

  bookings: IBooking[];

  editForm = this.fb.group({
    id: [],
    number: [],
    capacity: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected roomService: RoomService,
    protected hotelService: HotelService,
    protected bookingService: BookingService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ room }) => {
      this.updateForm(room);
    });
    this.hotelService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IHotel[]>) => mayBeOk.ok),
        map((response: HttpResponse<IHotel[]>) => response.body)
      )
      .subscribe((res: IHotel[]) => (this.hotels = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.bookingService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IBooking[]>) => mayBeOk.ok),
        map((response: HttpResponse<IBooking[]>) => response.body)
      )
      .subscribe((res: IBooking[]) => (this.bookings = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(room: IRoom) {
    this.editForm.patchValue({
      id: room.id,
      number: room.number,
      capacity: room.capacity
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const room = this.createFromForm();
    if (room.id !== undefined) {
      this.subscribeToSaveResponse(this.roomService.update(room));
    } else {
      this.subscribeToSaveResponse(this.roomService.create(room));
    }
  }

  private createFromForm(): IRoom {
    return {
      ...new Room(),
      id: this.editForm.get(['id']).value,
      number: this.editForm.get(['number']).value,
      capacity: this.editForm.get(['capacity']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRoom>>) {
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

  trackBookingById(index: number, item: IBooking) {
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
