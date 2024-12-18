import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../constants/api_urls';
import { Cons, map, Observable } from 'rxjs';
import { Page } from '../../models/page';
import { Consumable } from '../../models/consumable';
import { JsonResponse } from '../../models/json-response';
import { handleResponse } from '../service-utils';

@Injectable({
  providedIn: 'root',
})
export class ConsumableService {
  controllerName: string = 'consumable';

  constructor(private http: HttpClient) {}

  create(consumable: Consumable): Observable<Consumable> {
    return this.http
      .post<JsonResponse<Consumable>>(
        API_BASE_URL + this.controllerName + '/',
        consumable
      )
      .pipe(map(handleResponse));
  }

  update(consumable: Consumable): Observable<Consumable> {
    return this.http
      .put<JsonResponse<Consumable>>(
        API_BASE_URL + this.controllerName + '/update',
        consumable
      )
      .pipe(map(handleResponse));
  }

  delete(id: number): Observable<Consumable> {
    return this.http
      .delete<JsonResponse<Consumable>>(
        API_BASE_URL + this.controllerName + '/delete/' + id
      )
      .pipe(map(handleResponse));
  }

  getConsumable(id: number): Observable<Consumable> {
    return this.http
      .get<JsonResponse<Consumable>>(
        API_BASE_URL + this.controllerName + '/' + id
      )
      .pipe(map(handleResponse));
  }

  getPage(page: number = 0, size: number = 10): Observable<Page<Consumable>> {
    let params = new HttpParams().set('page', page).set('size', size);

    return this.http
      .get<JsonResponse<Page<Consumable>>>(
        API_BASE_URL + this.controllerName + '/page',
        { params }
      )
      .pipe(map(handleResponse));
  }

  getAll(): Observable<Consumable[]>{
    return this.http
      .get<JsonResponse<Page<Consumable>>>(
        API_BASE_URL + this.controllerName + '/',
      )
      .pipe(map(handleResponse));
  }

}
