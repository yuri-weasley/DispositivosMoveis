import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { styles } from "./CommonStyles";
import { useIsFocused } from "@react-navigation/native";
import AlunoController from "../controller/AlunoController";
import AlunoItem from "./AlunoItem";
import { Aluno } from "../model/Aluno";

export default function AlunoTela({ navigation }) {
  const controller = new AlunoController();
  const [alunos, setAlunos] = useState([]);
  const [matricula, setMatricula] = useState("");
  const [nome, setNome] = useState("");

  const isFocused = useIsFocused();
  useEffect(() => {
    controller.obterTodos((objs) => setAlunos(objs));
  }, [isFocused]);

  const myKeyExtractor = (item) => {
    return item.matricula;
  };

  function excluirAluno(matriculaExc) {
    controller
      .excluir(matriculaExc)
      .then(controller.obterTodos((objs) => setAlunos(objs)));
  }
  function adicionarAluno() {
    let alunoAux = new Aluno(matricula, nome, null);
    controller.incluir(alunoAux).then((resultado) => {
      if (resultado) {
        setMatricula("");
        setNome("");
        controller.obterTodos((objs) => setAlunos(objs));
      }
    });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Matricula"
        value={matricula}
        onChangeText={setMatricula}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TouchableOpacity style={styles.button} onPress={adicionarAluno}>
        <Text style={styles.buttonTextBig}>Salvar</Text>
      </TouchableOpacity>
      <FlatList
        data={alunos}
        contentContainerStyle={styles.itemsContainer}
        keyExtractor={myKeyExtractor}
        renderItem={({ item }) => (
          <AlunoItem
            onDelete={() => excluirAluno(item.matricula)}
            aluno={item}
          />
        )}
      />
    </View>
  );
}
