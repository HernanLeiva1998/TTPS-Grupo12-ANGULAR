import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../constants/api_urls';
import { map, Observable } from 'rxjs';
import { User } from '../../models/user';
import { JsonResponse } from '../../models/json-response';
import { handleResponse } from '../service-utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  controllerName: string = '/user';

  constructor(private http: HttpClient) { }

  // Método para obtener los consumibles desde la API
  getUsers(): Observable<any> {
    return this.http.get<any>(`${API_BASE_URL}/users`);
  }

  create(user: User): Observable<User> {
    return this.http
      .post<JsonResponse<User>>(
        API_BASE_URL + this.controllerName + '/',
        user
      )
      .pipe(map(handleResponse));
  }
}
