/*
Para utilizar os métodos de AsyncStorage, será necessário adotar elementos da sintaxe voltados para a sincronização em ambiente assíncrono, tais como:

- async
Na definição de funções chamadoras.

- await
Na espera pela execução do método.

Por exemplo, podemos armazenar a configuração de um tema ou assunto para um aplicativo, por meio de código em sintaxe TypeScript, como pode ser observado a seguir.
*/

import AsyncStorage from '@react-native-async-storage/async-storage';

const salvarTema = async (valorTema: string) => {
     try {
         await AsyncStorage.setItem('tema', valorTema);
     } catch (e) {}
 }

 /*
 Do mesmo modo, é possível recuperar a configuração armazenada, em uma execução posterior do aplicativo, como pode ser visto na listagem seguinte. Note que o retorno de uma função assíncrona deve ser um elemento Promise para o tipo desejado.
 */

 const recuperarTema = async (): Promise<string> => {
    try {
        const tema = await AsyncStorage.getItem('tema');
        return tema !== null ? tema : '';
    } catch (e) {
        return '';
    }
 }