import { Router } from "express";
import { getHelloWorld, getPong, getABC } from "../controllers/index.controllers.js";

const router = Router();

router.get("/", getHelloWorld);
router.get("/ping", getPong);
router.get("/a/b/c", getABC);

export default router;