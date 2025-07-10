import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../interfaces/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private apiUrl = "http://localhost:8080/api/roles";

  constructor(private http: HttpClient) { }
  //OBTENER LOS DATOS
  getRoles(): Observable<Rol[]>{
    return this.http.get<Rol[]>(this.apiUrl);
  }
}
