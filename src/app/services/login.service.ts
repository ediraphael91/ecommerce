import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/api/usuarios/login'; // Ajusta a tu endpoint real

  constructor(private http: HttpClient) {}

  login(credentials: { correo: string, password: string }): Observable<any> {
    return this.http.post<any>(this.baseUrl, credentials);
  }
}
