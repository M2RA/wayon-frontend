import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OperacoesService } from './../../services/operacoes-service.service';
import { OperacaoFinanceiraResponseDto } from '../../assets/utils/operaco-financeira-response-dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-transferencias',
  imports: [
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    CommonModule
],
  templateUrl: './transferencias.html',
  styleUrl: './transferencias.css',
})
export class Transferencias implements OnInit{
  constructor(private operacoesService:OperacoesService,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private router: Router
  ){

  }


  displayedColumns: string[] = ['tipoOperacao','valorOperacao','saldoInstantaneo','dataAgendamento','dataExecucao','observacao'];
  dataSource = new MatTableDataSource<OperacaoFinanceiraResponseDto>;
  extratos:OperacaoFinanceiraResponseDto[] = [];
  numeroConta!:string;

  titulo:string = "Transferências";

  ngOnInit(){
    this.route.paramMap.subscribe(param =>{
      this.numeroConta = param.get('numeroConta') ?? '';
    })
    this.getExtrato();
  }

  getExtrato(){
    this.operacoesService.getExtrato(this.numeroConta).subscribe({
      next: (response) => {
        response.forEach(r => {
          let registro:OperacaoFinanceiraResponseDto = {
            id: r.id,
            tipoOperacao: r.tipoOperacao,
            numeroConta: r.numeroConta,
            valorOperacao: this.aplicaMascaraMoeda(r.tipoOperacao,r.valorOperacao),
            saldoInstantaneo: this.aplicaMascaraMoeda(r.tipoOperacao,r.saldoInstantaneo),
            dataAgendamento: this.aplicarMascaraDatas(r.dataAgendamento),
            dataExecucao: this.aplicarMascaraDatas(r.dataExecucao),
            observacao: r.observacao
          }
          this.extratos.push(registro);
        })
        this.dataSource.data = this.extratos;
      }, error: (error: HttpErrorResponse)  => {
        console.log('Erro ao obter extrato:', error.error);
          this.snackBar.open(error.error || 'Erro ao obter extrato. Contate o suporte.', "Fechar", {
            duration: 10000,
            panelClass: ['snackbar-error'],
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }

    })
  }

  criarNovaTransferencia(){
      this.router.navigate([`nova/${this.numeroConta}`]);
  }

  aplicaMascaraMoeda(tipo:string, valor: string){
    let retorno = tipo === 'SAQUE' ? `(R$ ${valor})` : `+ R$ ${valor}`
    return retorno;
  }

  aplicarMascaraDatas(valor: string){
    let data: Date = new Date(valor);
    return data.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false // Formato 24h
    });
  }

  sair(){
    this.router.navigate([``]);
  }
}
