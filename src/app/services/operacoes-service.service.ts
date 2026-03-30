import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { OperacaoFinanceiraDTO } from '../assets/utils/operacao-financeira-dto';
import { OperacaoFinanceiraResponseDto } from './../assets/utils/operaco-financeira-response-dto';

@Injectable({
  providedIn: 'root',
})
export class OperacoesService {
  constructor(private httpClient:HttpClient) {}

  private readonly API_BASE = `${environment.context}/operacoes`;

  getExtrato(numeroConta: string): Observable<OperacaoFinanceiraResponseDto[]> {
    let url: string = `${this.API_BASE}/extrato/${numeroConta}`;
    return this.httpClient.get<OperacaoFinanceiraResponseDto[]>(`${url}`);
  }
}
