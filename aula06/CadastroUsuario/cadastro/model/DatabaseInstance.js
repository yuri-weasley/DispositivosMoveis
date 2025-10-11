// Como a conexão com SQLite pelo Expo apresenta diferenças sutis, não poderemos aproveitar a conexão, sendo necessário utilizar o código seguinte no arquivo DatabaseInstance.js.

import * as SQLite from "expo-sqlite";

var db = SQLite.openDatabase("Escola.db");

export default db;
