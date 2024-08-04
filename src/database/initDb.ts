import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'incidences.db',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS incidences (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, school TEXT, regional TEXT, district TEXT, date TEXT, description TEXT, photo TEXT, audio TEXT)',
    );
  })
};
