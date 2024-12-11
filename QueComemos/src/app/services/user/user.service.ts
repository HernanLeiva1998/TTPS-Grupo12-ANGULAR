import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../constants/api_urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // Método para obtener los consumibles desde la API
  getUsers(): Observable<any> {
    return this.http.get<any>(`${API_BASE_URL}/users`);
  }
}
