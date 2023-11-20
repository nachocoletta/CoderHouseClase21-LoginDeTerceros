import { Server } from 'socket.io';
import mongoose from 'mongoose';
import 'dotenv/config';
import ProductManager from '../dao/ProductManager.js';

const URL_DB = process.env.DB_MONGO_ATLAS;
let io;

export const initDb = async () => {
    try {
        // console.log("URL_DB", URL_DB)
        await mongoose.connect(URL_DB);
        console.log('Database conected 🚀');
    } catch (error) {
        console.log('Ah ocurrido un error al intentar conectarnos a la DB', error.message);
    }
}
