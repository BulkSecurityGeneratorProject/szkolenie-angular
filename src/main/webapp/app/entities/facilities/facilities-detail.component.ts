import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFacilities } from 'app/shared/model/facilities.model';

@Component({
  selector: 'jhi-facilities-detail',
  templateUrl: './facilities-detail.component.html'
})
export class FacilitiesDetailComponent implements OnInit {
  facilities: IFacilities;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ facilities }) => {
      this.facilities = facilities;
    });
  }

  previousState() {
    window.history.back();
  }
}
