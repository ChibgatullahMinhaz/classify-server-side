import { Router } from "express";
import { serverStart } from "../Controllers/initial.js";
const router = Router();

router.get('/',serverStart);


export default router;