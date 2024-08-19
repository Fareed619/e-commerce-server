import { Router } from "express";
import { check, validationResult } from "express-validator";

const router = Router();

router.get(
  "/register",
  check("username", "UserName is required ").notEmpty(),
  check("email", "Enter a valid email").isEmail(),
  check("password", "Enter password between 5 to 12 char ").isLength({
    min: 5,
    max: 12,
  }),
  async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    try{

    }catch(error){

    }
  }
);

export default router;
