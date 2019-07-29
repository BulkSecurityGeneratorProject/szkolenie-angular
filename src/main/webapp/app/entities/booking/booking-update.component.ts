import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IBooking, Booking } from 'app/shared/model/booking.model';
import { BookingService } from './booking.service';
import { IRoom } from 'app/shared/model/room.model';
import { RoomService } from 'app/entities/room';

@Component({
  selector: 'jhi-booking-update',
  templateUrl: './booking-update.component.html'
})
export class BookingUpdateComponent implements OnInit {
  isSaving: boolean;

  rooms: IRoom[];

  editForm = this.fb.group({
    id: [],
    user: [],
    startDate: [],
    endDate: [],
    rooms: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected bookingService: BookingService,
    protected roomService: RoomService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ booking }) => {
      this.updateForm(booking);
    });
    this.roomService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IRoom[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRoom[]>) => response.body)
      )
      .subscribe((res: IRoom[]) => (this.rooms = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(booking: IBooking) {
    this.editForm.patchValue({
      id: booking.id,
      user: booking.user,
      startDate: booking.startDate,
      endDate: booking.endDate,
      rooms: booking.rooms
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const booking = this.createFromForm();
    if (booking.id !== undefined) {
      this.subscribeToSaveResponse(this.bookingService.update(booking));
    } else {
      this.subscribeToSaveResponse(this.bookingService.create(booking));
    }
  }

  private createFromForm(): IBooking {
    return {
      ...new Booking(),
      id: this.editForm.get(['id']).value,
      user: this.editForm.get(['user']).value,
      startDate: this.editForm.get(['startDate']).value,
      endDate: this.editForm.get(['endDate']).value,
      rooms: this.editForm.get(['rooms']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBooking>>) {
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
