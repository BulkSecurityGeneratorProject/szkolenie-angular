import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Facilities } from 'app/shared/model/facilities.model';
import { FacilitiesService } from './facilities.service';
import { FacilitiesComponent } from './facilities.component';
import { FacilitiesDetailComponent } from './facilities-detail.component';
import { FacilitiesUpdateComponent } from './facilities-update.component';
import { FacilitiesDeletePopupComponent } from './facilities-delete-dialog.component';
import { IFacilities } from 'app/shared/model/facilities.model';

@Injectable({ providedIn: 'root' })
export class FacilitiesResolve implements Resolve<IFacilities> {
  constructor(private service: FacilitiesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFacilities> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Facilities>) => response.ok),
        map((facilities: HttpResponse<Facilities>) => facilities.body)
      );
    }
    return of(new Facilities());
  }
}

export const facilitiesRoute: Routes = [
  {
    path: '',
    component: FacilitiesComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Facilities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FacilitiesDetailComponent,
    resolve: {
      facilities: FacilitiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Facilities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FacilitiesUpdateComponent,
    resolve: {
      facilities: FacilitiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Facilities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FacilitiesUpdateComponent,
    resolve: {
      facilities: FacilitiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Facilities'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const facilitiesPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: FacilitiesDeletePopupComponent,
    resolve: {
      facilities: FacilitiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Facilities'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
