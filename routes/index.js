import { Router } from "express";
import usersAuthRouter from "./usersAuth.js";
import productRouter from "./products.js";
import googleRouter from "./google.js";

const router = Router();

router.use("/api", usersAuthRouter);
router.use("/api/product", productRouter);
router.use( googleRouter);

export default router;
