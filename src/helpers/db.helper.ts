import { ConnectionPool, config as mssqlConfig } from 'mssql';

// Replace the following with your SQL Server connection details
const config: mssqlConfig = {
    user: 'adrideba',
    password: 'Bejbe236!',
    server: 'tastemalta.database.windows.net',
    database: 'Taste',
};

const pool = new ConnectionPool(config);

export async function connectToDatabase(): Promise<ConnectionPool> {
  try {
    await pool.connect();
    console.log('Connected to the database');
    return pool;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

export async function closeDatabaseConnection(): Promise<void> {
  try {
    await pool.close();
    console.log('Connection to the database closed');
  } catch (error) {
    console.error('Error closing the database connection:', error);
    throw error;
  }
}