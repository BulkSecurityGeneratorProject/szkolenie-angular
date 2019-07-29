import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Facalities } from 'app/shared/model/facalities.model';
import { FacalitiesService } from './facalities.service';
import { FacalitiesComponent } from './facalities.component';
import { FacalitiesDetailComponent } from './facalities-detail.component';
import { FacalitiesUpdateComponent } from './facalities-update.component';
import { FacalitiesDeletePopupComponent } from './facalities-delete-dialog.component';
import { IFacalities } from 'app/shared/model/facalities.model';

@Injectable({ providedIn: 'root' })
export class FacalitiesResolve implements Resolve<IFacalities> {
  constructor(private service: FacalitiesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFacalities> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Facalities>) => response.ok),
        map((facalities: HttpResponse<Facalities>) => facalities.body)
      );
    }
    return of(new Facalities());
  }
}

export const facalitiesRoute: Routes = [
  {
    path: '',
    component: FacalitiesComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Facalities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FacalitiesDetailComponent,
    resolve: {
      facalities: FacalitiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Facalities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FacalitiesUpdateComponent,
    resolve: {
      facalities: FacalitiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Facalities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FacalitiesUpdateComponent,
    resolve: {
      facalities: FacalitiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Facalities'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const facalitiesPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: FacalitiesDeletePopupComponent,
    resolve: {
      facalities: FacalitiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Facalities'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
