// Passamos para a definição do DAO, no arquivo UsuarioDAO.ts, subdiretório model, fornecendo os complementos necessários, e acrescentando um método para alteração da senha.

import db from "./DatabaseInstance";
import { Usuario } from "./Usuario";
import { GenericDAO } from "./GenericDAO";

export default class UsuarioDAO extends GenericDAO<Usuario, string> {
  protected getCreateSQL(): string {
    return (
      " CREATE TABLE USUARIO(LOGIN VARCHAR(10) " +
      " PRIMARY KEY, " +
      " NOME VARCHAR(20), SENHA VARCHAR(128))  "
    );
  }
  protected getTableName(): string {
    return "USUARIO";
  }
  protected getInsertSQL(): string {
    return "INSERT INTO USUARIO VALUES ( ?, ?, ? )";
  }
  protected getInsertParams(entidade: Usuario): any[] {
    return [entidade.login, entidade.nome, entidade.senha];
  }
  protected getUpdateSQL(): string {
    return "UPDATE USUARIO SET NOME = ? WHERE LOGIN = ?";
  }
  protected getUpdateParams(entidade: Usuario): any[] {
    return [entidade.nome, entidade.login];
  }
  protected getDeleteSQL(): string {
    return "DELETE FROM USUARIO WHERE LOGIN = ?";
  }
  protected getSelectAllSQL(): string {
    return "SELECT * FROM USUARIO";
  }
  protected getSelectOneSQL(): string {
    return "SELECT * FROM USUARIO WHERE LOGIN = ?";
  }
  protected getEntidade(linha: any): Usuario {
    return new Usuario(linha.MATRICULA, linha.NOME, linha.SENHA);
  }

  //Adicionamos um método para alteração da senha, com o nome alterarSenha, recebendo a chave (login) e a nova senha. Nos sistemas para controle de acesso é uma boa prática separar o tratamento da senha, nos comandos UPDATE, de qualquer outro campo da entidade.
  
  public async alterarSenha(chave: string, senha: string): Promise<void> {
    await db.transaction((txn: any) =>
      txn.executeSql("UPDATE USUARIO SET SENHA = ? WHERE LOGIN =?", [
        senha,
        chave,
      ])
    );
  }
}
