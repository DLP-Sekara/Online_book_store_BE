import express from "express";
import CustomerController from "../controllers/customerController";
const route = express.Router();
route.get("/all", CustomerController?.getAllCustomer);
route.post("/signup", CustomerController?.saveCustomer);
route.post("/signin", CustomerController?.loginCustomer);
route.get("/logout", CustomerController?.logout);
route.post("/refresh", CustomerController?.refresh);
route.get("/details", CustomerController?.userDetail);
route.put("/update", CustomerController?.userDetailUpdate);
route.delete("/delete", CustomerController?.deleteCustomer);

export default route;
