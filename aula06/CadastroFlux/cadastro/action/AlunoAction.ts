import alunoDispatcher from "../AlunoDispatcher";
import { Aluno } from "../../model/Aluno";

export default class AlunoActions {
  public criarAluno(aluno: Aluno) {
    alunoDispatcher.dispatch({
      actionType: "CRIAR_ALUNO",
      value: aluno,
    });
    alunoDispatcher.dispatch({
      actionType: "OBTER_ALUNOS",
    });
  }
  public excluirAluno(matricula: string) {
    alunoDispatcher.dispatch({
      actionType: "EXCLUIR_ALUNO",
      value: matricula,
    });
    alunoDispatcher.dispatch({
      actionType: "OBTER_ALUNOS",
    });
  }
  public obterAlunos() {
    alunoDispatcher.dispatch({
      actionType: "OBTER_ALUNOS",
    });
  }

  private constructor() {}
  private static acoes: AlunoActions = new AlunoActions();
  public static getInstance(): AlunoActions {
    return this.acoes;
  }
}

/*
A classe AlunoActions irá encapsular todas as ações referentes à gerência de alunos, ou seja, organizará as chamadas para alunoDispatcher. Nossa classe segue o padrão de desenvolvimento Singleton, com a utilização de um construtor privado, uma instância privada estática, e um método estático para obtenção da instância.
*/