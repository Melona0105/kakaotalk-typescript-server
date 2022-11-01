import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

// mysql 접속정보
const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

export const database = mysql.createConnection(dbConfig);

database.connect();
