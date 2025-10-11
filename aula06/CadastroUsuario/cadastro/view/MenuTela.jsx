import React from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { styles } from "./CommonStyles";

export default function MenuTela({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => Alert.alert("Cadastro de Alunos")}
      >
        <Text style={styles.buttonTextBig}>Alunos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => Alert.alert("Cadastro de Professores")}
      >
        <Text style={styles.buttonTextBig}>Professores</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonTextBig}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
