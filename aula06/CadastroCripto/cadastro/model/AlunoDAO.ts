import { Aluno } from "./Aluno";
import { GenericDAO } from "./GenericDAO";
import Cipher from "../cripto/Cipher";
import StoredKey from "../cripto/StoredKey";
import KeyGenerator from "../cripto/KeyGenerator";

export default class AlunoDAO extends GenericDAO<Aluno, string> {
  protected getCreateSQL(): string {
    return (
      " CREATE TABLE ALUNO (MATRICULA VARCHAR(10) " +
      " PRIMARY KEY,NOME VARCHAR(20),REGISTRO INTEGER)"
    );
  }
  protected getTableName(): string {
    return "ALUNO";
  }
  protected getInsertSQL(): string {
    return "INSERT INTO ALUNO VALUES ( ?, ?, ? )";
  }
  protected getInsertParams(entidade: Aluno): any[] {
    let criacao = new Date();
    let nomeCripto = this.cipher.criptografar(this.strKey, entidade.nome);
    return [entidade.matricula, nomeCripto, criacao.getTime()];
  }
  protected getUpdateSQL(): string {
    return "UPDATE ALUNO SET NOME = ? WHERE MATRICULA = ?";
  }
  protected getUpdateParams(entidade: Aluno): any[] {
    let nomeCripto = this.cipher.criptografar(this.strKey, entidade.nome);
    return [nomeCripto, entidade.matricula];
  }
  protected getDeleteSQL(): string {
    return "DELETE FROM ALUNO WHERE MATRICULA = ?";
  }
  protected getSelectAllSQL(): string {
    return "SELECT * FROM ALUNO";
  }
  protected getSelectOneSQL(): string {
    return "SELECT * FROM ALUNO WHERE MATRICULA = ?";
  }
  protected getEntidade(linha: any): Aluno {
    let criacao = new Date(linha.REGISTRO);
    let nome = this.cipher.decriptografar(this.strKey, linha.NOME);
    return new Aluno(linha.MATRICULA, nome, criacao);
  }

  private strKey!: StoredKey;
  private cipher: Cipher = new Cipher();

  constructor() {
    super();
    let generator = new KeyGenerator();
    generator.restoreKey("ALUNODAOKEY_AD").then((valor) => {
      if (valor != null) this.strKey = valor;
      else
        generator
          .createKey("ALUNODAOKEY_AD")
          .then((valor) => {
            if (valor != null) this.strKey = valor;
          });
    });
  }
}
