fetch('https://api.com/endpoint/', {
method: 'POST',
headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
},
body: JSON.stringify({
    nome: 'Alexandre',
    cpf: '000.000.000-00'
    })
});

/* 
O exemplo demonstra a utilização da Fetch API para o envio de dados utilizando o método HTTP POST para um endpoint REST.

Note que, para requisições POST, há pequenas diferenças na sintaxe do Fetch:

- método HTTP definido pelo parâmetro “method”;
- cabeçalho da requisição e o tipo de dado a ser transferido definidos pelo parâmetro “header” e “Accept”;
- definição dos dados a serem enviados, formatados como string JSON e definidos pelo parâmetro “body”.
*/