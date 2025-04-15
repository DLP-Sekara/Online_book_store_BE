import express from "express";
import CustomerController from "../controllers/customerController";
const route = express.Router();
route.get("/all", CustomerController?.getAllCustomer); //auth
route.post("/signup", CustomerController?.saveCustomer);
route.post("/signin", CustomerController?.loginCustomer);
route.get("/logout", CustomerController?.logout); //auth
route.post("/refresh", CustomerController?.refresh);
route.get("/details", CustomerController?.userDetail); //auth
route.put("/update", CustomerController?.userDetailUpdate); //auth
route.delete("/delete", CustomerController?.deleteCustomer); //auth,role

export default route;
