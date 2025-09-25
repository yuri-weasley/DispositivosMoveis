/*
Os comandos SQL definidos são utilizados pela classe GestorDados, implementada logo após esses comandos (squlCreate, sqlSelect, sqlInsert e sqlDelete). Essa classe é semelhante à que foi utilizada no primeiro exemplo, mas agora conta com a persistência sendo efetuada no SQLite.

OBS.: Cada interrogação é um parâmetro que será substituído por um valor na execução do comando.
*/

import db from './DatabaseInstance';
 import { Produto } from './Produto';

 const sqlCreate =
         'CREATE TABLE IF NOT EXISTS PRODUTO('+
         'CODIGO INTEGER PRIMARY KEY, '+
         ' NOME VARCHAR(20), QUANTIDADE INTEGER)';
 const sqlInsert =
         'INSERT INTO PRODUTO ( CODIGO, NOME, QUANTIDADE )'+
         ' VALUES (?,?,?)';
 const sqlDelete =
         'DELETE FROM PRODUTO WHERE CODIGO=?';
 const sqlSelect =
         'SELECT * FROM PRODUTO';

 class GestorDados {
     private async criarBanco(){
     const database = await db;
     database.transaction(txn => txn.executeSql(sqlCreate,[]));
     }
     public async remover(chave: string){
     (await db).transaction(txn =>
             txn.executeSql(sqlDelete,[parseInt(chave)]));
     }
     public async adicionar(produto: Produto){
     (await db).transaction(txn => txn.executeSql(sqlInsert,
             [produto.codigo,produto.nome,produto.quantidade]));
     }
     public async obterTodos(
             useRetorno: (produtos: Array<Produto>) => void){
     let objetos = [];
     (await db).transaction((txn) => txn.executeSql(sqlSelect,[],
         (txn, results) => {
         for (let i = 0; i < results.rows.length; ++i) {
             let linha = results.rows.item(i)
             let produto: Produto = new Produto(
                 linha.CODIGO, linha.NOME, linha.QUANTIDADE);
             objetos.push(produto);
         }
         useRetorno(objetos);
         if(objetos.length<1)
             this.criarBanco();
         }));
     }
 }

 export default GestorDados;