import { createConnection, Connection } from "mysql2/promise";
import dbConfig from './db_config.js';

const createDBConnection = async (): Promise<Connection> => {
  const connection: Connection = await createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: dbConfig.PORT
  });

  return connection as Connection;
};

export default createDBConnection;
