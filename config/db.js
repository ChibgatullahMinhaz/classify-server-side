// config/db.js
import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config';

const uri = process.env.DB_URL;
let db;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function connectDB() {
    try {
        db = client.db('ClassifyDB');
        console.log('MongoDB connected with Native driver ✅');
    } catch (err) {
        console.error('MongoDB connection failed:', err);
        process.exit(1);
    }
}

function getDB() {
    if (!db) throw new Error('Database not connected!');
    return db;
}

export default { connectDB, getDB };
