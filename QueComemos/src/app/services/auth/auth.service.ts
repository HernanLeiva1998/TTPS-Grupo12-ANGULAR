import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../../models/user';
import { JsonResponse } from '../../models/json-response';
import { API_BASE_URL } from '../../constants/api_urls';
import { Authorization } from '../../models/authorization';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  controllerName: string = '/auth';

  constructor(private http: HttpClient) {}

  login(user: User): Observable<JsonResponse<User> | null> {
    return this.http
      .post<JsonResponse<User> | null>(
        API_BASE_URL + this.controllerName + '/login',
        user,
        { observe: 'response' }
      )
      .pipe(
        map((response) => {
          const r = response.body;
          if (r?.ok) {
            const authorization = new Authorization(
              response.headers.get('Authorization') ?? ''
            );
            localStorage.setItem('auth', JSON.stringify(authorization));
            return r;
          } else {
            throw new Error(response.body?.message);
          }
        })
      );
  }
}
