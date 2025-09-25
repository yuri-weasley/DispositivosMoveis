import { openDatabase } from 'react-native-sqlite-storage';

 var db = openDatabase({ name: 'LojaDatabase.db' });

 db.transaction(function(txn) {
     txn.executeSql('SELECT * FROM PRODUTO',[],
         function(tx,res) {
             console.log('registros:', res.rows.length);
         } ,
         function(tx,err) {
             console.log('erro:', err.message);
         }
     );
 });

 /*
 No exemplo, temos a abertura do banco em um arquivo com o nome "LojaDatabase.db", pela função openDatabase. Com o banco criado, iniciamos uma transação, com o uso do método transaction, e utilizamos a transação para executar um comando SQL de consulta ao banco de dados.


A consulta é iniciada pelo método executeSQL, utilizando como parâmetros uma instrução em SQL, valores de parâmetros para a instrução, uma função callback para tratamento dos dados recebidos, e outra para o tratamento de erros de execução. No caso, efetuamos uma consulta na tabela PRODUTO, sem parâmetros, sendo exibido o total de registros retornados na primeira função de callback.


De forma geral, temos a necessidade da primeira callback apenas para o tratamento de dados recebidos, podendo ser omitida em instruções dos tipos DDL e DML.
 */