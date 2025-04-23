import express from "express";
import adminController from "../controllers/adminController";
const route = express.Router();
route.get("/all", adminController?.getAllAdmins);
route.post("/signup", adminController?.saveAdmin);
route.post("/signin", adminController?.loginAdmin);
route.get("/logout", adminController?.logout); //auth,role
route.post("/refresh", adminController?.refresh);
route.delete("/delete", adminController?.deleteAdmin); //auth,role

export default route;
