import express from "express";
import mongoose from "mongoose";
import data from "./data.js";
import dotenv from "dotenv";
const app = express();
const port = 1000;
// Dotenv comfig.
dotenv.config();
//Connecting to  database.
mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (err) throw err;
  console.log("connected to Mongoose(MongoDb)");
});
app.get("/api/products", (req, res) => {
  res.send(data);
});
app.get("/api/products/slug/:slug", (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    console.log("there was an error");
    return res.status(404).send({ message: "Products not found" });
  }
  res.send(data.product);
});
app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id == req.params.id);
  if (product) {
    res.send(product);
  } else {
    console.log("there was an error");
    return res.status(404).send({ message: "Products not found" });
  }
  res.send(data.product);
});
const server = app.listen(port, () =>
  console.log("Server connected to port: " + port)
);
