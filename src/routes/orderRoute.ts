import express from "express";
import orderController from "../controllers/orderController";
const route = express.Router();
route.get("/all", orderController?.getAllOrders); //auth,role
route.get("/find", orderController?.getOrderById); //auth,role
route.delete("/delete", orderController?.deleteOrder); //auth,role
route.get("/user-orders", orderController?.getUserOrders); //auth,role
route.put("/update-status", orderController?.updateOrderStatus); //auth,role
route.put("/update-payment", orderController?.updatePaymentStatus); //auth,role
route.post("/create", orderController?.createOrder); //auth,role

//sample route for middleware check
//route.post("/create", roleCheck(["admin"]), saveOrder); //customer

export default route;
