/*
Como os processos básicos de consulta e manipulação de dados são muito repetitivos, é possível adotar um modelo genérico, em que temos uma classe de entidade T e uma classe de chave primária K associada. Para tal, definiremos uma classe DAO genérica, no arquivo GenericDAO.ts, de acordo com a listagem apresentada a seguir.
*/

import db from './DatabaseInstance';
 
export abstract class GenericDAO<T, K>{
  protected abstract getCreateSQL(): string;
  protected abstract getTableName(): string;
  protected abstract getInsertSQL(): string;
  protected abstract getInsertParams(entidade: T): any[];
  protected abstract getUpdateSQL(): string;
  protected abstract getUpdateParams(entidade: T): any[];
  protected abstract getDeleteSQL(): string;
  protected abstract getSelectAllSQL(): string;
  protected abstract getSelectOneSQL(): string;
  protected abstract getEntidade(linha: any): T;
 
  public async incluir(entidade: T): Promise<void>{
    await db.transaction((txn: any) => txn.executeSql(
      this.getInsertSQL(),this.getInsertParams(entidade)
    ));        
  }
  public async alterar(entidade: T): Promise<void>{
    await db.transaction((txn: any) => txn.executeSql(
      this.getUpdateSQL(),this.getUpdateParams(entidade)
    )); 
  }
  public async excluir(chave: K): Promise<void>{
    await db.transaction((txn: any) => txn.executeSql(
      this.getDeleteSQL(),[chave]
    )); 
  }
  public obterTodos(useRetorno:(colecao: T[])=>void):void{
    db.transaction((txn: any) =>
      txn.executeSql(this.getSelectAllSQL(),[],
                    (txn: any, results: any)=>{
        let retorno: T[] = [];
        for(let i = 0; i < results.rows.length; i++)
          retorno.push(
                  this.getEntidade(results.rows.item(i)));
        useRetorno(retorno);
      })
    )
  }
  public obter(chave: K, useRetorno:(entidade: T | null)=>void):void{
    db.transaction((txn: any) => txn.executeSql(
      this.getSelectOneSQL(),[chave],(txn: any, results: any)=>{
        let retorno: T | null = null;
        if(results.rows.length>0)
          retorno = this.getEntidade(results.rows.item(0));
        useRetorno(retorno);
      })
    )
  }
  constructor(){
    db.transaction((txn: any)=>
      txn.executeSql(
        " SELECT name FROM sqlite_master WHERE type='table' "+
        " AND name = ? ",
        [this.getTableName()],(txn: any, results: any)=>{
          if(results.rows.length==0)
            db.transaction((txn: any)=>
               txn.executeSql(this.getCreateSQL(),[])
            );
        }));
  }    
}