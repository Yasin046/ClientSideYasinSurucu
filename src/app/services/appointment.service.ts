import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppointmentDto } from '../models/interfaces/appointment-dto';
import { Observable } from 'rxjs';
import { AppointmentAddDto } from '../models/interfaces/appointment-add-dto';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:8080/appointment';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser')!).token
      : null;
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  getAppointments(): Observable<AppointmentDto[]> {
    return this.http.get<AppointmentDto[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getAppointment(id: number): Observable<AppointmentDto> {
    return this.http.get<AppointmentDto>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  addAppointment(dto: AppointmentAddDto): Observable<AppointmentDto> {
    return this.http.post<AppointmentDto>(this.apiUrl, dto, { headers: this.getAuthHeaders() });
  }

  updateAppointment(id: number, dto: AppointmentAddDto): Observable<AppointmentDto> {
    return this.http.put<AppointmentDto>(`${this.apiUrl}/${id}`, dto, { headers: this.getAuthHeaders() });
  }

  deleteAppointment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
