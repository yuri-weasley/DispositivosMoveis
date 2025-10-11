import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import UsuarioController from "../controller/UsuarioController";
import { Usuario } from "../model/Usuario";
import { styles } from "./CommonStyles";

export default function UsuarioForm({ navigation }) {
  const gestor = new UsuarioController();
  const [login, setLogin] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConf, setSenhaConf] = useState("");
  const salvar = () => {
    if (senha != senhaConf) Alert.alert("Falha na confirmação da senha");
    else {
      let usuarioAux = new Usuario(login, nome, senha);
      gestor.incluir(usuarioAux).then((retorno) => {
        if (retorno) navigation.navigate("Login");
        else Alert.alert("Erro ao criar usuário");
      });
    }
  };

  return (
    <View style={[styles.container, styles.fundoEscuro]}>
      <TextInput
        style={styles.formInput}
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
      />
      <TextInput
        style={styles.formInput}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.formInput}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.formInput}
        placeholder="Confirme a Senha"
        secureTextEntry={true}
        value={senhaConf}
        onChangeText={setSenhaConf}
      />
      <TouchableOpacity style={styles.formButton} onPress={salvar}>
        <Text style={styles.formButtonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}
