import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const TextoAninhado = () => {
  const [titulo, setTitulo] = useState('Texto do elemento filho');

  const modificaTexto = () => {
    setTitulo('Este texto está sendo exibido pois o primeiro elemento do texto foi pressionado/tocado');
  };

  return (
    <Text style={styles.baseText}>
      <Text style={styles.titulo} onPress={modificaTexto}>
        {titulo}
        {'/n'}
      </Text>

    </Text>
  );
};

const styles = StyleSheet.create({
  baseText: {
	fontFamily: "Verdana",
	marginTop:50,
	marginLeft:10,
  backgroundColor: '#FFF'
  },
  titulo: {
	marginTop:10,
	fontSize: 18,
	fontWeight: "bold",
  backgroundColor: '#FFF'
  }
});

export default TextoAninhado;