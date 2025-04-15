import express from "express";
import adminController from "../controllers/adminController";
const route = express.Router();
route.post("/signup", adminController?.saveAdmin);
route.post("/signin", adminController?.loginAdmin);
route.get("/logout", adminController?.logout); //auth,role
route.post("/refresh", adminController?.refresh);

export default route;
