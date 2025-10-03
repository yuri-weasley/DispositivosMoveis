/* Para rodar este exemplo, execute: npm install axios

-> Uso do método POST
*/

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
 
export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState('');
 
  useEffect(() => {
    setLoading(true);
 
    axios.post('https://reqbin.com/echo/post/json', {
      data: {
        'Id': 78912,
        'Customer': 'Jason Sweet',
        'Quantity': 1,
        'Price': 18.00
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
    <Text>Resultado da Requisição: {data.success}</Text>
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