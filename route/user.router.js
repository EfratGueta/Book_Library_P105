import { Router } from "express";
import { 
  getAllUsers, 
  getUserById, 
  createUser 
} from "../controlers/user.controlers.js"
const routerUsers = Router();

routerUsers.get("/", getAllUsers);
routerUsers.get("/:id", getUserById);
routerUsers.post("/", createUser);

export default routerUsers;