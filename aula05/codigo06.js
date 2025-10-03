/*
Por convenção, embora não seja uma regra, na conexão com recursos REST utilizamos o método POST para a persistência de dados e o método PUT para a atualização. Em termos práticos, o método POST funcionaria nas duas situações.

Vamos ao código, precedido de alguns comentários:


- Perceba que o método HTTP foi alterado para o PUT;
- A URL contém uma “path variable”, conforme definido pela API, onde o código do usuário a ser alterado deve ser informado (esse código foi retornado na requisição anterior, no momento de sua criação);
- No parâmetro “data”, foi passado um JSON semelhante ao utilizado no método POST. No exemplo a chave “name” foi alterada;
- A exemplo da requisição anterior, também foi passado como parâmetro o token para acesso ao recurso remoto;
- Como resultado da requisição, será retornada uma string JSON (mostrada logo após o código) contendo os dados atualizados do usuário – ou seja, seu “name”.
*/

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
 
export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
 
  useEffect(() => {
    setLoading(true);
 
    const token = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
    const dados = { 'name': 'Alexandre Paixão', 'gender': 'male', 'email': 'alexandre@email.com.br', 'status': 'active' };
 
    axios.put('https://gorest.co.in/public/v1/users/2365', dados, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then(function (response) {
        // handle success
        console.log(response.data);
        setData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
        setLoading(false);
      });
 
}, []);
 
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Resultado (exemplo):
/*

{
 ''meta'': null,
 ''data'': {
     ''email'': ''alexandre@email.com.br'',
     ''name'': ''Alexandre Paixão'',
     ''gender'': ''male'',
     ''status'': ''active'',
     ''id'': 2365
 }
 }

*/