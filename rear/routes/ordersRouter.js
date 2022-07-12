import express from "express";
import Products from "../models/products.js";
import Data from "../data.js";
import expressAsyncHandler from "express-async-handler";
import Users from "../models/users.js";
import { isAuth } from "../utils/utils.js";
import Orders from "../models/orders.js";
const ordersRouter = express.Router();
ordersRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res, next) => {
    const newOrder = new Orders({
      orderItems: req.body.orderItems.map((item) => ({
        ...item,
        product: item._id,
      })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemPrice: req.body.itemPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      shippingPrice: req.body.shippingPrice,
      PaymentMethod: req.body.PaymentMethod,

      user: req.user._id,
    });
    const order = await newOrder.save();

    console.log(order);

    return res.status(201).send({ message: "New Order Created", order });
  })
);
export default ordersRouter;
