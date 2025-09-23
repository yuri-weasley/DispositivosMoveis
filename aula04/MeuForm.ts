import React, { useState } from "react";
import { obterCor, salvarCor } from "./ExemploArquivo";
import { Alert } from "react-native";

export default function MeuForm() {
    const [cor, setCor] = useState('');
    const clickSalvar = () => {
        salvarCor(cor).then(() => 
        Alert.alert('Cores', 'A cor foi salva'));
    }
    const clickObter = () => {
        obterCor().then((valor) => setCor(valor));
    }
}