/*
O exemplo seguinte apresenta o código correspondente a uma classe, ProdutoSchema, equivalente a uma “tabela” em um banco de dados relacionais, mas implementada no modelo do Realm Database. Realizar a persistência local consiste em criar esse tipo de classes, mediante as quais definimos que dados desejamos armazenar e que serão utilizadas para a persistência e recuperação de dados no banco embarcado.
*/

class ProdutoSchema extends Realm.Object { }
 ProdutoSchema.schema = {
   name: 'Produto',
   properties: {
     produto_id: { type: 'int', default: 0 },
     produto_nome: 'string',
     produto_descricao: 'string',
     produto_preco: 'number',
   }
 };
 
 //Listagem de Produtos
 let listarProdutos = () => {
   return realm_produto.objects('Produto');
 }
 
 //Adição de Produtos
 let adicionarProdutos = (nomeProduto, descricaoProduto, precoProduto) => {
 
   const ultimoId = realm_produto.objects('Produto').sorted('produto_id', true)[0];
   const maiorId = ultimoId == null ? 1 : ultimoId.produto_id;
   const proximoId = maiorId != 1 ? maiorId + 1 : maiorId;
 
   realm_produto.write(() => {
     const prod = realm_produto.create('Produto', {
       produto_id: proximoId,
       produto_nome: nomeProduto.produto_nome,
       produto_descricao: descricaoProduto.produto_descricao,
       produto_preco: precoProduto.produto_preco,
     });
   });
 }
 
 export {
   ProdutoSchema,
   listarProdutos,
   adicionarProdutos
 }