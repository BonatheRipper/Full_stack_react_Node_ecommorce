import express from "express";
import Products from "../models/products.js";
import Data from "../data.js";
import Users from "../models/users.js";
const seedRouter = express.Router();

seedRouter.get("/", async (req, res, next) => {
  await Products.deleteMany({});
  await Users.deleteMany({});

  const createProducts = await Products.insertMany(Data.products);
  const createUsers = await Users.insertMany(Data.users);

  res.send({ createProducts, createUsers });
});
export default seedRouter;
