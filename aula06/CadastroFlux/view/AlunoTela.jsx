import React, {useState, useEffect} from 'react';
 import {Text, View, TextInput, TouchableOpacity, FlatList} 
        from 'react-native';
 import {styles} from './CommonStyles';
 import AlunoItem from './AlunoItem';
 import {Aluno} from '../model/Aluno';
 import AlunoStore from '../cadastro/store/AlunoStore';
 import AlunoActions from '../cadastro/action/AlunoAction';
 
 export default function AlunoTela( { navigation } ) {
   const [alunos, setAlunos] = useState([]);
   const [matricula, setMatricula] = useState('');
   const [nome,setNome] = useState('');
   const [listenerAdded, setListenerAdded] = useState(false);
   
   useEffect(() => {
     if(!listenerAdded){
       AlunoStore.getInstance().addChangeListener(()=>
         setAlunos(AlunoStore.getInstance().getAlunos()));
       setListenerAdded(true);  
       AlunoActions.getInstance().obterAlunos();
     }
   });
   
   const myKeyExtractor = item => {
     return item.matricula;
   };
 
   function excluirAluno(matriculaExc){
     AlunoActions.getInstance().excluirAluno(matriculaExc);
   }
 
   function adicionarAluno(){
     let alunoAux = new Aluno(matricula,nome,null);
     AlunoActions.getInstance().criarAluno(alunoAux);
     setMatricula('');
     setNome('');
   }
 
   return (
     <View style={styles.container}>
       <TextInput style={styles.input} placeholder='Matricula'
         value={matricula} onChangeText={setMatricula} /> 
       <TextInput style={styles.input} placeholder='Nome' 
         value={nome} onChangeText={setNome}/> 
       <TouchableOpacity style={styles.button}
         onPress={adicionarAluno} > 
         <Text style={styles.buttonTextBig}>Salvar</Text> 
       </TouchableOpacity> 
       <FlatList data={alunos}
         contentContainerStyle={styles.itemsContainer}
         keyExtractor={myKeyExtractor}
         renderItem={({item}) => 
         <AlunoItem onDelete={()=>excluirAluno(item.matricula)}      
         aluno={item} />}
       />
     </View>
   );
 }