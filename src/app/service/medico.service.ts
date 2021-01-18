import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { Medico } from '../model/medico';
import { API_CONFIG } from '../config/api.config';
import { MedicoPage } from '../model/medicoPage';

@Injectable()
export class MedicoService {

  constructor(private http: HttpClient) { }

  getById(id): Observable<Medico> {
    return this.http.get<Medico>(`${API_CONFIG.baseUrl}/medicos/${id}`);
  }

  create(medico: Medico): Observable<Medico> {
    return this.http.post<Medico>(`${API_CONFIG.baseUrl}/medicos`, medico);
  }

  update(medico: Medico): Observable<Medico> {
    return this.http.put<Medico>(`${API_CONFIG.baseUrl}/medicos/${medico.id}`, medico);
  }

  delete(id): Observable<Medico> {
    return this.http.delete<Medico>(`${API_CONFIG.baseUrl}/medicos/${id}`);
  }

  findByEmail(email: string): Observable<Medico> {
    return this.http.get<Medico>(`${API_CONFIG.baseUrl}/medicos/email?email=${email}`);
  }

  findByName(name: string): Observable<Medico[]> {
    return this.http.get<Medico[]>(`${API_CONFIG.baseUrl}/medicos/nome?nome=${name}`);
  }

  findAll(page: number = 0, limit: number = 10): Observable<MedicoPage> {
    return this.http.get<MedicoPage>(`${API_CONFIG.baseUrl}/medicos/?page=${page}&limit=${limit}`);
  }

}
