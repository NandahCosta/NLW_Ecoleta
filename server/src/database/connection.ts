import knex from 'knex';
import path from 'path';

const connection = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname,'database.sqlite'),
  },
  useNullAsDefault: true // sem esta linha ocorria erro a  qual a solicitava- inserida neste arquivo e no connection
});

export default connection;

