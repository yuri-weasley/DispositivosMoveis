// Para rodar este exemplo, execute: npm install axios

import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import axios from 'axios';
 
export default App = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
 
    useEffect(() => {
 
    axios.get('https://api.stackexchange.com/2.3/articles?order=desc&sort=activity&site=stackoverflow')
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
;