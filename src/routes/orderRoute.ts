import express from "express";
import orderController from "../controllers/orderController";
const route = express.Router();
route.get("/all", orderController?.getAllOrders); //auth,role
route.get("/search", orderController?.searchOrders); //auth,role
route.get("/delete", orderController?.deleteOrders); //auth,role
route.get("/update", orderController?.updateOrders); //auth,role
route.post("/create", orderController?.createOrders); //auth,role

//sample route for middleware check
//route.post("/create", roleCheck(["admin"]), saveOrder); //customer

export default route;
