import { Router } from "express";
import { check, validationResult } from "express-validator";
import UserModel from "../models/UserAuth.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { auth } from "../utils/index.js";

const router = Router();

// Registration
router.post(
  "/register",
  check("username", "UserName is required ").notEmpty(),
  check("email", "Enter a valid email").isEmail(),
  check("password", "Enter password between 5 to 12 char ").isLength({
    min: 5,
    max: 12,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    const {
      body: { username, email, password },
    } = req;

    try {
      let userAuth = await UserModel.findOne({ email });
      if (userAuth) {
        return res.status(400).json({ msg: "User is already exists" });
      }

      let cart = {};
      for (let i = 0; i < 300; i++) {
        cart[i] = 0;
      }
      userAuth = new UserModel({
        username,
        password,
        email,
        cartData: cart,
      });

      // incrypt the password before storing it in database
      const salt = await bcryptjs.genSalt(10);
      userAuth.password = await bcryptjs.hash(password, salt);
      await userAuth.save();

      const payload = {
        user: {
          id: userAuth.id,
        },
      };

      jwt.sign(
        payload,
        process.env.TOKENSECRETKEY,
        { expiresIn: "5 days" },
        (err, token) => {
          if (err) throw err;

          return res.status(200).json({ token });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: error.message });
    }
  }
);

// login
router.post(
  "/login",
  check("email", "Enter a valid email").isEmail(),
  check("password", "Enter password between 5 to 12 char ").isLength({
    min: 5,
    max: 12,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ msg: errors.array() });

    const {
      body: { email, password },
    } = req;

    try {
      let userAuth = await UserModel.findOne({ email });
      if (!userAuth)
        return res.status(400).json({ msg: "User Not Found sing up fist" });

      const isMatch = await bcryptjs.compare(password, userAuth.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ msg: "Password is not correct please try again" });
      }

      const payload = {
        user: {
          id: userAuth.id,
        },
      };

      jwt.sign(
        payload,
        process.env.TOKENSECRETKEY,
        { expiresIn: "5 days" },
        (err, token) => {
          if (err) throw err;

          return res.status(200).json({ token });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: error.message });
    }
  }
);

router.get("/loaduser", auth, async (req, res) => {
  const ID = req.user.id;
  const user = await UserModel.findById(ID);
  if (!user) return res.status(400).json({ msg: "user not found" });

  return res.status(200).json(user);
});

export default router;
