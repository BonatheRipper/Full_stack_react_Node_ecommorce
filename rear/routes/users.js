import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHanler from "express-async-handler";
import Users from "../models/users.js";
import { generateToken, isAuth } from "../utils/utils.js";
const usersRouter = express.Router();

usersRouter.post(
  "/login",
  expressAsyncHanler(async (req, res, next) => {
    const user = await Users.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    return res.status(401).send({ message: "invalid  email or password" });
  })
);
usersRouter.put(
  "/profile",
  isAuth,
  expressAsyncHanler(async (req, res, next) => {
    const user = await Users.findById(req.user._id);
    if (user) {
      user.name = req.body.name;
      user.email = req.body.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      console.log(updatedUser);
      return res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
    return res.status(404).send({ message: "User not found" });
  })
);
usersRouter.post(
  "/register",
  expressAsyncHanler(async (req, res, next) => {
    const { email, password, password2, fullName } = req.body;
    if ((email, password, password2, fullName)) {
      const user = await Users.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(401)
          .send({ message: "User with that email already exist" });
      }
      if (password === password2) {
        let newUser = await Users.create({
          name: fullName,
          email: email,
          password: bcrypt.hashSync(password),
        });
        if (newUser) {
          return res.send({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: generateToken(newUser),
          });
        }

        return res.status(401).send({ message: "There was an error" });
      } else {
        return res.status(401).send({ message: "Password needs to match" });
      }
    }
    return res.status(401).send({ message: "One or more field missing" });
  })
);
export default usersRouter;
