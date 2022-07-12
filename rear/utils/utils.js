import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET
  );
};
export const isAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.slice(7, auth.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: "Invalid request" });
      }
      req.user = decode;
      next();
    });
    return;
  }
  return res.status(401).send({ message: "something's not right" });
};
