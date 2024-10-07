import { Router } from "express";
import passport from "passport";

const router = Router();

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/auth/google/redirect",
  passport.authenticate(
    "google",
    {
      successRedirect: "http://localhost:5173/",
      failureRedirect: "http://localhost:5173/login",
    },
    (req, res) => {
      res.send(req.user);
    }
  )
);

export default router;
