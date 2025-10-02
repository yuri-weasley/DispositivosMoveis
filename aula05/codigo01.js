import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
 
export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
 
  useEffect(() => {
    fetch('https://api.stackexchange.com/2.3/articles?order=desc&sort=activity&site=stackoverflow')
      .then((response) => response.json()) 
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []); 
  return (
 
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <Text>Loading...</Text> : 
      ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
          <Text style={{ fontSize: 14, color: 'green', textAlign: 'center', paddingBottom: 10}}>Dados do StackOverFlow:</Text>
          <FlatList
            data={data.items}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => (
              <Text>{'[' + item.tags + ']' + '\n' + item.title + '\n\n' }</Text>
            )}
          />
        </View>
      )}
    </View>
  );
};

/*
No exemplo, podemos ver a sintaxe da Fetch API ao recuperar os recursos de uma API Rest. Nesse caso, foi utilizado o método HTTP GET e setado, a partir do objeto “response”, o método “json()”, informando o tipo de dado a ser transferido. Em seguida, o retorno foi atribuído ao state data, utilizado como datasource do componente FlatList.
*/