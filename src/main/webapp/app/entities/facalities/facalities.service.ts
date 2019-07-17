import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFacalities } from 'app/shared/model/facalities.model';

type EntityResponseType = HttpResponse<IFacalities>;
type EntityArrayResponseType = HttpResponse<IFacalities[]>;

@Injectable({ providedIn: 'root' })
export class FacalitiesService {
  public resourceUrl = SERVER_API_URL + 'api/facalities';

  constructor(protected http: HttpClient) {}

  create(facalities: IFacalities): Observable<EntityResponseType> {
    return this.http.post<IFacalities>(this.resourceUrl, facalities, { observe: 'response' });
  }

  update(facalities: IFacalities): Observable<EntityResponseType> {
    return this.http.put<IFacalities>(this.resourceUrl, facalities, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFacalities>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFacalities[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
