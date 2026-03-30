import { OperacaoFinanceiraDTO } from "./operacao-financeira-dto";

export interface TransferenciaDto {
  saida: OperacaoFinanceiraDTO;
  entrada: OperacaoFinanceiraDTO;
}
