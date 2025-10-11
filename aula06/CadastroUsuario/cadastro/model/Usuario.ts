// Definição da entidade Usuário

export class Usuario {
  login: string;
  nome: string;
  senha: string;

  constructor(login: string, nome: string, senha: string) {
    this.login = login;
    this.nome = nome;
    this.senha = senha;
  }
}