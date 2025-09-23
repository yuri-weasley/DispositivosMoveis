export class Produto {
    codigo: number;
    nome: string;
    quantidade: number;
    constructor(codigo: number, nome: string, quantidade: number) {
        this.codigo = codigo;
        this.nome = nome;
        this.quantidade = quantidade;
    }
}

let prod1 = new Produto(1, "Teclado", 50);
let prod1str = JSON.stringify(prod1);
let prod2 = JSON.parse(prod1str);

/*
Essa classe poderia ser utilizada na programação em JavaScript ou TypeScript, com a alocação efetuada pelo operador new, levando à ocupação de áreas de memória não contíguas. Para que possamos transmitir as informações representadas por cada um dos objetos, ou armazená-las em arquivo, devemos utilizar um formato apropriado em modo texto, no caso JSON.
*/