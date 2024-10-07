import express, { json } from "express";
import routes from "./routes/index.js";
import { connect } from "mongoose";
import { configDotenv } from "dotenv";
import session from "express-session";
import cors from "cors";
import MongoStore from "connect-mongo";

const app = express();
configDotenv();
app.use(express.json());
app.use(cors());
app.use("/images", express.static("upload/images"));

const corsOptions = {
  origin: "http://localhost:5173", // Change to your frontend's URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));
// const sessionStore = MongoStore.create({
//   mongoUrl: process.env.CONNECTION,
//   collectionName: "ecommercesessions",
// });
// app.use(
//   session({
//     secret: "lsjgdinjnsiojifjeijijos8848",
//     saveUninitialized: false,
//     resave: false,
//     store: sessionStore,
//     cookie: {
//       maxAge: 300000, // day
//     },
//   })
// );

// FOR ALL ROUTES
app.use(routes);

// ENVIROMENT VARIABLES
const PORT = process.env.PORT || 4000;
const CONNECTION = process.env.CONNECTION;

// TURN ON THE ( SERVER ) AND ( DATA BASE )
const start = async () => {
  try {
    await connect(CONNECTION);
    app.listen(PORT, (err) => {
      if (!err) {
        console.log("Server is working on port " + PORT);
      } else {
        console.log("Error " + err);
      }
    });
  } catch (e) {
    console.log(e.message);
  }
};

start();
