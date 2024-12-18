import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsonResponse } from '../../models/json-response';
import { Page } from '../../models/page';
import { Menu } from '../../models/menu';
import { map, Observable } from 'rxjs';
import { handleResponse } from '../service-utils';
import { API_BASE_URL } from '../../constants/api_urls';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  controllerName: string = 'menu';

  constructor(private http: HttpClient) {}

  create(menu: Menu): Observable<Menu> {
    return this.http
      .post<JsonResponse<Menu>>(API_BASE_URL + this.controllerName + '/', menu)
      .pipe(map(handleResponse));
  }

  update(menu: Menu): Observable<Menu> {
    return this.http
      .put<JsonResponse<Menu>>(
        API_BASE_URL + this.controllerName + '/update',
        menu
      )
      .pipe(map(handleResponse));
  }

    delete(id: number): Observable<Menu> {
      return this.http
        .delete<JsonResponse<Menu>>(
          API_BASE_URL + this.controllerName + '/delete/' + id
        )
        .pipe(map(handleResponse));
    }

      getMenu(id: number): Observable<Menu> {
        return this.http
          .get<JsonResponse<Menu>>(
            API_BASE_URL + this.controllerName + '/' + id
          )
          .pipe(map(handleResponse));
      }

  getPage(page: number = 0, size: number = 10): Observable<Page<Menu>> {
    let params = new HttpParams().set('page', page).set('size', size);

    return this.http
      .get<JsonResponse<Page<Menu>>>(
        API_BASE_URL + this.controllerName + '/page',
        { params }
      )
      .pipe(map(handleResponse));
  }
}
