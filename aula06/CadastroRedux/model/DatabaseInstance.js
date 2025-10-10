import Realm from "realm";

const db = new Realm({
  path: "EscolaDB.realm",
  schema: [
    {
      name: "Aluno",
      primaryKey: "matricula",
      properties: { matricula: "string", nome: "string", registro: "int" },
    },
  ],
});

export default db;
