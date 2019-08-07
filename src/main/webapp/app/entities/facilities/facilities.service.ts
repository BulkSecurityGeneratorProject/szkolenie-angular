import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFacilities } from 'app/shared/model/facilities.model';

type EntityResponseType = HttpResponse<IFacilities>;
type EntityArrayResponseType = HttpResponse<IFacilities[]>;

@Injectable({ providedIn: 'root' })
export class FacilitiesService {
  public resourceUrl = SERVER_API_URL + 'api/facilities';

  constructor(protected http: HttpClient) {}

  create(facilities: IFacilities): Observable<EntityResponseType> {
    return this.http.post<IFacilities>(this.resourceUrl, facilities, { observe: 'response' });
  }

  update(facilities: IFacilities): Observable<EntityResponseType> {
    return this.http.put<IFacilities>(this.resourceUrl, facilities, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFacilities>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFacilities[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
