export interface OperacaoFinanceiraResponseDto{
  id:number;
  tipoOperacao: string,
  numeroConta: string,
  valorOperacao: string,
  saldoInstantaneo: string,
  dataAgendamento: string,
  dataExecucao: string,
  observacao: string
}
