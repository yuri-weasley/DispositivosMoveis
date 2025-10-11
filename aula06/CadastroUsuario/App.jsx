import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Login from "./cadastro/view/Login";
import MenuTela from "./cadastro/view/MenuTela";
import UsuarioForm from "./cadastro/view/UsuarioForm";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login do Sistema", headerLeft: () => null }}
        />
        <Stack.Screen
          name="UsuarioForm"
          component={UsuarioForm}
          options={{ title: "Novo Usuário" }}
        />
        <Stack.Screen
          name="MenuTela"
          component={MenuTela}
          options={{ title: "Tela Principal", headerLeft: () => null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
