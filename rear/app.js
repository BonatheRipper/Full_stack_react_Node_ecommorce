import express from "express";
import data from "./data.js";
const app = express();
const port = 1000;

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
const server = app.listen(port, () =>
  console.log("Server connected to port: " + port)
);
