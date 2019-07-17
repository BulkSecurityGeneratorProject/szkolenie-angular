import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFacalities } from 'app/shared/model/facalities.model';

@Component({
  selector: 'jhi-facalities-detail',
  templateUrl: './facalities-detail.component.html'
})
export class FacalitiesDetailComponent implements OnInit {
  facalities: IFacalities;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ facalities }) => {
      this.facalities = facalities;
    });
  }

  previousState() {
    window.history.back();
  }
}
