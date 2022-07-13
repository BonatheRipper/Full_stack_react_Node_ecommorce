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

    return res.status(201).send({ message: "New Order Created", order });
  })
);
ordersRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log("HHHELLLO");
    const order = await Orders.find({ user: req.user._id });
    if (order) {
      console.log(order);
      res.send(order);
    } else {
      console.log("theres n error");
      res.status(404).send({ message: "There was an error" });
    }
  })
);
ordersRouter.get(
  "/:orderId",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Orders.findById(req.params.orderId);
    if (order) {
      console.log(order);
      res.send(order);
    } else {
      console.log("theres n error");
      res.status(404).send({ message: "There was an error" });
    }
  })
);

ordersRouter.put(
  "/:orderId/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Orders.findById(req.params.orderId);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      const upDatedOrder = await order.save();
      return res.send({ message: "Payment Success", upDatedOrder });
    } else {
      return res.status(404).send({ message: "order does not exist" });
    }
  })
);
export default ordersRouter;
