import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPrice, Price } from 'app/shared/model/price.model';
import { PriceService } from './price.service';
import { IRoom } from 'app/shared/model/room.model';
import { RoomService } from 'app/entities/room';

@Component({
  selector: 'jhi-price-update',
  templateUrl: './price-update.component.html'
})
export class PriceUpdateComponent implements OnInit {
  isSaving: boolean;

  rooms: IRoom[];

  editForm = this.fb.group({
    id: [],
    amount: [],
    date: [],
    room: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected priceService: PriceService,
    protected roomService: RoomService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ price }) => {
      this.updateForm(price);
    });
    this.roomService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IRoom[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRoom[]>) => response.body)
      )
      .subscribe((res: IRoom[]) => (this.rooms = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(price: IPrice) {
    this.editForm.patchValue({
      id: price.id,
      amount: price.amount,
      date: price.date,
      room: price.room
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const price = this.createFromForm();
    if (price.id !== undefined) {
      this.subscribeToSaveResponse(this.priceService.update(price));
    } else {
      this.subscribeToSaveResponse(this.priceService.create(price));
    }
  }

  private createFromForm(): IPrice {
    return {
      ...new Price(),
      id: this.editForm.get(['id']).value,
      amount: this.editForm.get(['amount']).value,
      date: this.editForm.get(['date']).value,
      room: this.editForm.get(['room']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrice>>) {
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
}
