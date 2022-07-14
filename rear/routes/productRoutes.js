import express from "express";
import Products from "../models/products.js";
import expressAsyncHandler from "express-async-handler";
const productRouter = express.Router();

productRouter.get("/", async (req, res, next) => {
  const products = await Products.find();
  res.send(products);
});
productRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res, next) => {
    const categories = await Products.find().distinct("category");
    if (categories) {
      res.send(categories);
    } else {
      console.log("there was an error finding categories");
      return res.status(404).send({ message: "Categories not found" });
    }
  })
);
productRouter.get("/slug/:slug", async (req, res) => {
  const product = await Products.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    console.log("there was an error");
    return res.status(404).send({ message: "Products not found" });
  }
});

productRouter.get("/:id", async (req, res) => {
  const product = await Products.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    return res.status(404).send({ message: "Products not found" });
  }
});
export default productRouter;
