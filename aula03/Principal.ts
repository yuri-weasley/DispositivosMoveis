import { Produto } from "./Produto";

let prod1 = new Produto(1, "Teclado", 50); // Cria o objeto prod1
let prod1str = JSON.stringify(prod1); // Converte o objeto prod1 para texto JSON
let prod2 = JSON.parse(prod1str); // Converte o texto JSON para um outro objeto, prod2

/*
A transformação de um objeto da classe Produto para texto JSON, bem como o processo contrário, podem ser observados no fragmento de código acima.

No código de exemplo, vemos a utilização da classe JSON, que faz parte do núcleo básico da plataforma Node.js, com a serialização do objeto prod1 pelo método stringify, bem como a recuperação do seu estado em um segundo objeto, processo que também é conhecido como de-serialização, por meio do método parse.
*/