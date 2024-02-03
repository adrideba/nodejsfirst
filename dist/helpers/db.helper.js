"use strict";
// db.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDatabaseConnection = exports.connectToDatabase = void 0;
const mssql_1 = require("mssql");
// Replace the following with your SQL Server connection details
const config = {
    user: 'adrideba',
    password: 'Bejbe236!',
    server: 'tastemalta.database.windows.net',
    database: 'Taste',
};
const pool = new mssql_1.ConnectionPool(config);
async function connectToDatabase() {
    try {
        await pool.connect();
        console.log('Connected to the database');
        return pool;
    }
    catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}
exports.connectToDatabase = connectToDatabase;
async function closeDatabaseConnection() {
    try {
        await pool.close();
        console.log('Connection to the database closed');
    }
    catch (error) {
        console.error('Error closing the database connection:', error);
        throw error;
    }
}
exports.closeDatabaseConnection = closeDatabaseConnection;
