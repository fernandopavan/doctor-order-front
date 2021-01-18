import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { API_CONFIG } from '../config/api.config';
import { PessoaFisica } from '../model/pessoaFisica';
import { PessoaFisicaPage } from '../model/pessoaFisicaPage';

@Injectable()
export class PessoaFisicaService {

  constructor(private http: HttpClient) { }

  getById(id): Observable<PessoaFisica> {
    return this.http.get<PessoaFisica>(`${API_CONFIG.baseUrl}/pessoas-fisicas/${id}`);
  }

  create(pessoa: PessoaFisica): Observable<PessoaFisica> {
    return this.http.post<PessoaFisica>(`${API_CONFIG.baseUrl}/pessoas-fisicas`, pessoa);
  }

  update(pessoa: PessoaFisica): Observable<PessoaFisica> {
    return this.http.put<PessoaFisica>(`${API_CONFIG.baseUrl}/pessoas-fisicas/${pessoa.id}`, pessoa);
  }

  delete(id): Observable<PessoaFisica> {
    return this.http.delete<PessoaFisica>(`${API_CONFIG.baseUrl}/pessoas-fisicas/${id}`);
  }

  findByName(name: string): Observable<PessoaFisica[]> {
    return this.http.get<PessoaFisica[]>(`${API_CONFIG.baseUrl}/pessoas-fisicas/nome?nome=${name}`);
  }

  // findAllSelect(): Observable<PessoaFisica[]> {
  //   return this.http.get<PessoaFisica[]>(`${API_CONFIG.baseUrl}/pessoas-fisicas`);
  // }

  findAll(page: number = 0, limit: number = 10): Observable<PessoaFisicaPage> {
    return this.http.get<PessoaFisicaPage>(`${API_CONFIG.baseUrl}/pessoas-fisicas/?page=${page}&limit=${limit}`);
  }

}
