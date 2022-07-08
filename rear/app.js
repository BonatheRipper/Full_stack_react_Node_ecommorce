import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const port = 1000;

import seedRouter from "./routes/seedRouter.js";
import productRouter from "./routes/productRoutes.js";
import usersRouter from "./routes/users.js";
// Dotenv comfig.
dotenv.config();
//Connecting to  database.
mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (err) throw err;
  console.log("connected to Mongoose(MongoDb)");
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/seed", seedRouter);
app.use("/api/users", usersRouter);

app.use("/api/products", productRouter);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const server = app.listen(port, () =>
  console.log("Server connected to port: " + port)
);
