import {GenericDAO} from '../model/GenericDAO';
 
export default abstract class GenericController<T,K> {
  protected dao!: GenericDAO<T,K>;
  protected abstract setDAO(): void;
 
  constructor(){
    this.setDAO();
  } 
  public async incluir(entidade: T): Promise<boolean>{
    try {
      await this.dao.incluir(entidade);
      return true;
    }catch(error){
      return false;
    }
  };
  public async alterar(entidade: T): Promise<boolean>{
    try {
      await this.dao.alterar(entidade);
      return true;
    }catch(error){
      return false;
    }
  };
  public async excluir(chave: K): Promise<boolean>{
    try {
      await this.dao.excluir(chave);
      return true;
    }catch(error){
      return false;
    }
  };
  public obterTodos(useRetorno:(colecao: T[])=>void):void{
    this.dao.obterTodos((colecao)=>useRetorno(colecao));
  };
  public obter(chave: K, 
               useRetorno:(entidade: T | null) => void):void{
    this.dao.obter(chave,(entidade)=>useRetorno(entidade)); 
  };
}