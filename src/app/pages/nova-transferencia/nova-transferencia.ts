import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { provideNgxMask } from 'ngx-mask';
import { EnumTipoOperacao } from '../../assets/utils/enum-tipo-operacao';
import { OperacaoFinanceiraDTO } from '../../assets/utils/operacao-financeira-dto';
import { TransferenciasService } from '../../services/transferencias-service.service';
import { TransferenciaDto } from './../../assets/utils/transferencia-dto';

@Component({
  selector: 'app-nova-transferencia',
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSnackBarModule
],
providers: [provideNgxMask()],
  templateUrl: './nova-transferencia.html',
  styleUrl: './nova-transferencia.css',
})
export class NovaTransferencia {
    constructor(private fb: FormBuilder,
              private transferciasService: TransferenciasService,
              private snackBar: MatSnackBar
  ) {}
  cadastroTransferencias!: FormGroup;
  titulo: string = "Nova Transferência";

  ngOnInit() {
    this.cadastroTransferencias = this.fb.group({
      contaOrigem: ['',[Validators.maxLength(10)]],
      contaDestino: ['',[Validators.maxLength(10)]],
      valorOperacao: ['', [Validators.required, Validators.min(0.01)]],
      dataExecucao: ['',],
      observacao: ['']
    });
  }

  cadastrar() {
    let saida: OperacaoFinanceiraDTO = {
      tipoOperacao: EnumTipoOperacao.SAQUE,
      contaCorrente: this.cadastroTransferencias.value.contaOrigem,
      valorOperacao: this.cadastroTransferencias.value.valorOperacao,
      dataExecucao: this.cadastroTransferencias.value.dataExecucao
    };

    let entrada: OperacaoFinanceiraDTO = {
      tipoOperacao: EnumTipoOperacao.DEPOSITO,
      contaCorrente: this.cadastroTransferencias.value.contaDestino,
      valorOperacao: this.cadastroTransferencias.value.valorOperacao,
      dataExecucao: this.cadastroTransferencias.value.dataExecucao
    };

    let transferenciaDto: TransferenciaDto = {
      saida: saida,
      entrada: entrada
    }

    this.transferciasService.cadastrar(transferenciaDto).subscribe({
      next: (response) => {
        console.log('Transferência cadastrada com sucesso:', response);
          this.snackBar.open('Transferência cadastrada com sucesso', "Fechar", {
            duration: 3000,
            panelClass: ['snackbar-sucesso'],
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        this.cadastroTransferencias.reset();
      }, error: (error: HttpErrorResponse) => {
        console.error('Erro ao cadastrar transferência:', error.error);
          this.snackBar.open(error.error || 'Erro ao cadastrar transferência. Verifique dados informados', "Fechar", {
            duration: 10000,
            panelClass: ['snackbar-error'],
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
      }
    });
  }
}
