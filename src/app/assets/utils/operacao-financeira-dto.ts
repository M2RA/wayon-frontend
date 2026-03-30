import { EnumTipoOperacao } from "./enum-tipo-operacao";

export interface OperacaoFinanceiraDTO {
    tipoOperacao: EnumTipoOperacao;
    contaCorrente: string;
    valorOperacao: number;
    dataExecucao: Date;
}
