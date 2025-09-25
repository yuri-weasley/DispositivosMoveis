/* 
Os comandos DDL são responsáveis pela criação das estruturas que receberão os dados e manterão os relacionamentos de forma consistente, tendo como elementos principais as tabelas e índices. Basicamente, utilizamos os comandos CREATE, ALTER e DROP como no exemplo seguinte, para a criação de uma tabela.
*/

CREATE TABLE IF NOT EXISTS PRODUTO(
     CODIGO INTEGER PRIMARY KEY,
     NOME VARCHAR(20),
     QUANTIDADE INTEGER);

/*
Aqui temos a criação da tabela chamada PRODUTO, com as colunas CODIGO, elemento numérico que funciona como identificador do registro, ou chave primária, NOME, do tipo texto, e QUANTIDADE, que também aceitará valores numéricos. Após a definição da estrutura de armazenamento, podemos utilizar os comandos DML para efetuar as operações de inclusão, alteração e exclusão de registros, o que é feito, respectivamente, por meio das instruções INSERT, UPDATE e DELETE.

Poderíamos criar um registro na tabela PRODUTO com o comando apresentado a seguir.
*/

INSERT INTO PRODUTO (CODIGO, NOME, QUANTIDADE)
 VALUES (1, 'Morango', 200);

/*
Além das instruções utilizadas para definição e manipulação de dados, as consultas efetuadas com o comando SELECT talvez tenham o papel mais relevante em termos de SQL. Esse comando se divide, inicialmente, em duas partes principais, que são a projeção (campos) e a restrição (condições).


Podemos observar, a seguir, um exemplo de comando de seleção.
*/

SELECT NOME FROM PRODUTO
 WHERE CODIGO BETWEEN 1 AND 5;

/*
No exemplo apresentado, temos uma consulta que retorna valor do campo NOME para cada registro presente na tabela PRODUTO (projeção), mas apenas para aqueles em que o campo CODIGO apresenta valores entre 1 e 5 (restrição). O comando SELECT é muito amplo e aceita elementos para ordenação, agrupamento, combinação e operações de conjunto, entre diversas outras possibilidades.

Operador -> Utilização
IN -> Retorna os registros em que o valor de um determinado campo está presente em um conjunto de valores.
NOT IN -> Retorna os registros em que o valor de um determinado campo não pode ser encontrado em um conjunto de valores.
LIKE -> O valor do campo deve estar de acordo com um padrão, sendo tipicamente utilizado em situações do tipo "começado com".
EXISTS -> Verifica uma condição de existência relacionada ao campo.
NOT EXISTS -> Verifica uma condição de inexistência relacionada ao campo.
BETWEEN -> Verifica se o valor se encontra entre dois limites.
ALL -> Retorna o valor caso todos os elementos do conjunto satisfaçam à condição.
ANY -> Retorna o valor caso algum elemento do conjunto satisfaça à condição.

Além dos operadores apresentados, podemos utilizar a comparação tradicional, como os símbolos de menor que, igualdade e maior que. Também são permitidas combinações lógicas com o uso de AND, OR e NOT.


É possível agrupar campos com GROUP BY, e utilizar operações de sumarização, como MAX, MIN e COUNT, além da possibilidade de aplicar restrições aos grupos formados com o uso de HAVING. Não menos importante, podemos ordenar os resultados por quaisquer campos, de forma ascendente ou descendente, com o uso de ORDER BY.


Uma consulta SQL mais complexa é apresentada na listagem seguinte.
*/

SELECT CODIGO, NOME FROM PRODUTO
 WHERE QUANTIDADE IN (
     SELECT MAX(QUANTIDADE) FROM PRODUTO)
 AND NOME LIKE 'A%';

/*
Segundo o que está expresso no exemplo, teremos como retorno o nome e o código dos produtos da base cuja quantidade seja equivalente ao máximo valor apresentado em toda a tabela e cujos nomes são iniciados com a letra "A".
*/