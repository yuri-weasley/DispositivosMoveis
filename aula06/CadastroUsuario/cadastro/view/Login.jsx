import React, { useState } from "react";
import { TextInput, TouchableOpacity, Alert, Text, View } from "react-native";
import { styles } from "./CommonStyles";
import UsuarioController from "../controller/UsuarioController";

export default function Login({ navigation }) {
  const gestor = new UsuarioController();
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  const logar = () => {
    gestor.obterLoginSenha(login, senha, (entidade) => {
      if (entidade == null) Alert.alert("Usuário ou senha inválido(s).");
      else {
        setLogin("");
        setSenha("");
        navigation.navigate("MenuTela");
      }
    });
  };

  return (
    <View style={[styles.container, styles.fundoEscuro]}>
      <Text style={styles.loginText}>NOSSO CADASTRO!!!</Text>
      <TextInput
        style={styles.formInput}
        placeholder="Usuário"
        value={login}
        onChangeText={setLogin}
      />
      <TextInput
        style={styles.formInput}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.formButton} onPress={logar}>
        <Text style={styles.formButtonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.formButton}
        onPress={() => navigation.navigate("UsuarioForm")}
      >
        <Text style={styles.formButtonText}>Criar Usuário</Text>
      </TouchableOpacity>
    </View>
  );
}
