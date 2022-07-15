import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import seedRouter from "./routes/seedRouter.js";
import productRouter from "./routes/productRoutes.js";
import ordersRouter from "./routes/ordersRouter.js";
import usersRouter from "./routes/users.js";
import path from "path";
const port = 1000;

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
app.use("/api/orders", ordersRouter);
app.use("/api/products", productRouter);
app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PayPal_Client_Id || "sb");
});
// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "../build")));
// app.get("*", (req, res) =>
//   res.sendfile(path.join(__dirname, "../build/index.html"))
// );

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => console.log("Server connected to port: " + port));
