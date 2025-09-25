import React, {useState, useEffect} from 'react';
import GestorDados from './dados/GestorDados';
import { useIsFocused } from '@react-navigation/native';

export default function ProdutoLista( { navigation } ) {
     const gestor = new GestorDados();
     const [produtos, setProdutos] = useState([]);

     const isFocused = useIsFocused();

     useEffect(() => {
         gestor.obterTodos((objs)=>setProdutos(objs));
     }, [isFocused]);

     const myKeyExtractor = item => {
         return item.codigo.toString();
     };

     function excluirProduto(codigo){
         gestor.remover(codigo).then(
             gestor.obterTodos((objs) => setProdutos(objs))
         );
     }
    }