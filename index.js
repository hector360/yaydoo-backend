import express from 'express';
import dotenv from 'dotenv';
dotenv.config("./.env");
import bodyParser from 'body-parser';
import cors from "cors";
import conectDB from './config/db.js';
import router from "./routes/index.js";

// app.use(express.static(__dirname+'/public'));
const port = process.env.PORT;

const app = express();
app.use(cors());
conectDB();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );

  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', router);
// app.use('/', require('./routes/index'));



app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message || "Something went wrong",
  });
});
app.listen(port, () => {
  console.log(`listening to port ${port}`);
})