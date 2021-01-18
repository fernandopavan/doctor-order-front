import { PessoaFisica } from './pessoaFisica';

export class Pedido {
    id: number;
    pessoaFisica: PessoaFisica;
    exames: string;
    dataValidade?: string;
}
