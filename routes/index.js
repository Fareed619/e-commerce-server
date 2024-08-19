import { Router } from "express";
import usersAuthRouter from "./usersAuth.js";

const router = Router();

router.use("/api", usersAuthRouter);

export default router;
