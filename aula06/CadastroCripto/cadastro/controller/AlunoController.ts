import { Aluno } from '../model/Aluno';
import AlunoDAO from '../model/AlunoDAO';
import GenericController from './GenericController';

export default class AlunoController extends GenericController<Aluno,string> {
  protected setDAO(): void { 
    this.dao = new AlunoDAO(); 
  }
}