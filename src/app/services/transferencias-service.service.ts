import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { TransferenciaDto } from '../assets/utils/transferencia-dto';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransferenciasService {
  constructor(private httpClient:HttpClient) {}

  private readonly API_BASE = `${environment.context}/transferencias`;

  cadastrar(transferenciaDto: TransferenciaDto): Observable<any> {
    console.log(`${this.API_BASE}/nova`);
    console.log('Transferencia DTO:', transferenciaDto);
    return this.httpClient.post(`${this.API_BASE}/nova`, transferenciaDto);
  }

}
