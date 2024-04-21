import express from 'express';
import admin from 'firebase-admin';
import cors from 'cors';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };
import dataRoutes from './routes.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
dotenv.config();
 
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://spotr-258a2-default-rtdb.firebaseio.com"
});

app.use('/', dataRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const db = admin.firestore();
export default db;
