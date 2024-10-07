import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

export const auth = async (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res
      .status(401)
      .json({ msg: "Token is not available, authorization denied" });
  }

  try {
    jwt.verify(token, process.env.TOKENSECRETKEY, (err, decoded) => {
      if (err) return res.status(401).json({ msg: "token is not valid" });
      else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
