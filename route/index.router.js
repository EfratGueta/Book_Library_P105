import { Router } from "express";

import userallRouters from "./user.router.js";
import bookallRouters from "./book.router.js";


const allRouters = Router();


allRouters.use("/user", userallRouters);
allRouters.use("/book", bookallRouters);


export default allRouters;