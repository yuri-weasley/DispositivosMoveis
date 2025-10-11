import { openDatabase } from 'react-native-sqlite-storage';
 
const db = openDatabase({ name: 'Escola.db' });
 
export default db;