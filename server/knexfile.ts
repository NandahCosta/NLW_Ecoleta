import path from 'path';

module.exports = {
   client: 'sqlite3',
   connection: {
    filename: path.resolve(__dirname,'src', 'database','database.sqlite'),
  },
  useNullAsDefault: true, // sem esta linha ocorria erro a  qual a solicitava- inserida neste arquivo e no connection
 
  migrations: {
      directory: path.resolve(__dirname,'src','database','migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname,'src','database','seeds')
},
};

