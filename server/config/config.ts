import dotenv from 'dotenv';

dotenv.config();

/************************Server Configuration**************************/

const SERVER_HOST = process.env.SERVER_HOST;
const SERVER_PORT = process.env.SERVER_PORT;

const SERVER = {
    host: SERVER_HOST,
    port: SERVER_PORT
};

/************************Mongo Configuration**************************/

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

const DB = {
    host: DB_HOST,
    user: DB_USERNAME,
    pass: DB_PASSWORD,
    url: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}`
};

/***********************************************************************/

const config = {
    server: SERVER,
    db: DB
};

export default config;
