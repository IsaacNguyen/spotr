import express from 'express';
import dotenv from 'dotenv';
const app = express();
const PORT = process.env.PORT || 3002;
dotenv.config();
const GOOGLE_MAPS_API = process.env.GOOGLE_MAPS_API;

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
    console.log({GOOGLE_MAPS_API});
  });