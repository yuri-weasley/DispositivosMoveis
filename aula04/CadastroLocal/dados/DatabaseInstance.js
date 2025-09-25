import { openDatabase } from 'react-native-sqlite-storage';

 var db = openDatabase({ name: 'LojaDatabase.db' });

 export default db;