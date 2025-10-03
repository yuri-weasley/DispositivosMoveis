/*
Alguns comentários prévios sobre o código:

- A constante “token” armazena o token fornecido pela API. Lembre-se de substituir seu valor pelo seu próprio token antes de executar o código;
- Na requisição do Axios, foi adicionado um novo parâmetro, “headers”, por meio do qual, entre outras informações, podemos incluir o tipo de autenticação usado;
- O retorno da API (mostrado logo depois do código), em caso de sucesso, consiste em uma nova instância do recurso “usuário” que criamos por meio de nossa requisição, contendo os dados dele.

-> Uso do método POST com autenticação via token
*/
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
 
export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
 
  useEffect(() => {
    setLoading(true);
 
    const token = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
    const dados = { 'name': 'Alexandre', 'gender': 'male', 'email': 'alexandre@email.com.br', 'status': 'active' };
 
    axios.post('https://gorest.co.in/public/v1/users', dados, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then(function (response) {
        // handle success
        console.log('Resultado: ');
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

// RESULTADO:
/*
                        {
 ''meta'': null,
 ''data'': {
     ''id'': 2365,
     ''name'': ''Alexandre'',
     ''email'': ''alexandre@email.com.br'',
     ''gender'': ''male'',
     ''status'': ''active''
 }
 }

*/