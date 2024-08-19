import express, { json } from "express";
import routes from "./routes/index.js";
import { connect } from "mongoose";
import { configDotenv } from "dotenv";

const app = express();
app.use(json());
configDotenv();

// FOR ALL ROUTES
app.use(routes);


// ENVIROMENT VARIABLES
const PORT = process.env.PORT || 4000;
const CONNECTION = process.env.CONNECTION;


const start = async () => {
  try {
    await connect(CONNECTION);
    app.listen(PORT, () => {
      console.log("Server is working on port " + PORT);
    });
  } catch (e) {
    console.log(e.message);
  }
};

start();
