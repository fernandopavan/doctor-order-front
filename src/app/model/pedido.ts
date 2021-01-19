import { PessoaFisica } from './pessoaFisica';
import { Medico } from './medico';

export class Pedido {
    id: number;
    pessoaFisica: PessoaFisica;
    medico: Medico;
    exames: string;
    dataValidade?: string;
}
