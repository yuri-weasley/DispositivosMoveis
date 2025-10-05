/*
Veja o fragmento a seguir em que é definido um método para persistência de dados que faz uso de “Redux actions”:
*/

const saveData = data => ({
 type: 'SAVE_DATA',
 payload: { data },
 meta: {
     offline: {
     // Aqui é definido o endereço da API remota e a ação a ser executada para persistência
     effect: { url: '/api/save-data', method: 'POST', json: { data } },
     // Aqui é definida a ação a ser executada após a realização da persistência:
     commit: { type: 'SAVE_DATA_COMMIT', meta: { data } },
     // Aqui é definida a ação a ser executada caso não seja possível, de forma definitiva, conectar com o servidor remoto e realizar a persistência dos dados:
     rollback: { type: 'SAVE_DATA_ROLLBACK', meta: { data } }
     }
 }
 });

 /*
 O fluxo definido no código acima segue uma ordem de execução: inicialmente é executada a ação effect, responsável por salvar os dados através da conexão remota. Se essa ação for executada com sucesso, então a ação commit é acionada.
 */