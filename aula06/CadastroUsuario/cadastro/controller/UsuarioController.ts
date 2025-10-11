/* A criptografia será gerenciada no controlador, já que a senha é armazenada e recuperada na forma criptografada, eliminando a necessidade de tratá-la na obtenção da entidade.

Nosso controlador apresenta um método interno para obtenção do valor criptografado, com base na biblioteca expo-crypto, adotando algoritmo SHA512, o qual gera um hash com alto nível de segurança, e codificação Base64. Qualquer operação que envolva o uso da senha deverá invocar o método getCripto sobre o valor fornecido.

Temos dois novos métodos em nosso controlador, um para alteração da senha, e outro para recuperação do usuário a partir do login e da senha.

*/

import { Usuario } from "../model/Usuario";
import UsuarioDAO from "../model/UsuarioDAO";
import GenericController from "./GenericController";
import * as Crypto from "expo-crypto"; 
import { CryptoEncoding } from "expo-crypto";

export default class UsuarioController extends GenericController<
  Usuario,
  string
> {
  private async getCripto(senha: string): Promise<string> {
    const senhaCripto = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA512,
      senha,
      { encoding: CryptoEncoding.BASE64 }
    );
    return senhaCripto;
  }

  protected setDAO(): void {
    // Temos o fornecimento de um objeto do tipo UsuarioDAO, definindo as funcionalidades básicas do controlador MVC, mas o método incluir deve ser alterado, já que temos o uso da senha. A alteração é simples, com a criptografia do campo senha da entidade, antes de invocar o método de inclusão herdado do controlador genérico.

    this.dao = new UsuarioDAO();
  }

  public async incluir(entidade: Usuario): Promise<boolean> {
    entidade.senha = await this.getCripto(entidade.senha);
    return super.incluir(entidade);
  }

  // No método alterarSenha, foi adotado o mesmo modelo de programação das alterações genéricas, mas a senha deve ser criptografada, antes da invocação do método subsequente no DAO, e como não era um método previsto no modelo genérico, ocorre a necessidade da conversão de tipo.
  
  public async alterarSenha(chave: string, senha: string): Promise<boolean> {
    try {
      let senhaCripto = await this.getCripto(senha);
      await (this.dao as UsuarioDAO).alterarSenha(chave, senhaCripto);
      return true;
    } catch (error) {
      return false;
    }
  }

  // O método obterLoginSenha utiliza o modelo de callback do SQLite, com o retorno da entidade para o método de tratamento. Efetuamos a consulta pela chave e comparamos a senha armazenada com o valor criptografado da senha fornecida, retornando o usuário obtido quando os valores são iguais, ou nulo para qualquer situação diferente.
  
  public obterLoginSenha(
    chave: string,
    senha: string,
    useRetorno: (entidade: Usuario | null) => void
  ) {
    this.getCripto(senha).then((senhaCripto) =>
      this.dao.obter(chave, (entidade) =>
        useRetorno(
          entidade == null
            ? null
            : entidade.senha == senhaCripto
            ? entidade
            : null
        )
      )
    );
  }
}
