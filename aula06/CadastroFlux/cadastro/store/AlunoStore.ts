import alunoDispatcher from "../AlunoDispatcher";
import { Aluno } from "../../model/Aluno";
import AlunoDAO from "../../model/AlunoDAO";
import { EventEmitter } from "events";

export default class AlunoStore extends EventEmitter {
  private dao = new AlunoDAO();
  private alunos: Aluno[] = [];
  public getAlunos(): Aluno[] {
    return this.alunos;
  }

  public addChangeListener(callback: () => void) {
    this.on("ALUNOS_CHANGE", callback);
  }
  public removeChangeListener(callback: () => void) {
    this.removeListener("ALUNOS_CHANGE", callback);
  }

  private constructor() {
    super();
    alunoDispatcher.register(this.dispatcherCallback.bind(this));
  }
  private static store: AlunoStore = new AlunoStore();
  public static getInstance(): AlunoStore {
    return this.store;
  }

  private dispatcherCallback(action: any) {
    switch (action.actionType) {
      case "CRIAR_ALUNO":
        this.criarAluno(action.value);
        break;
      case "EXCLUIR_ALUNO":
        this.excluirAluno(action.value);
        break;
      case "OBTER_ALUNOS":
        this.obterAlunos();
        break;
    }
  }

  private async criarAluno(aluno: Aluno) {
    await this.dao.incluir(aluno);
  }
  private async excluirAluno(matricula: string) {
    await this.dao.excluir(matricula);
  }
  private obterAlunos() {
    this.dao.obterTodos((retorno) => {
      this.alunos = retorno;
      this.emit("ALUNOS_CHANGE");
    });
  }
}
