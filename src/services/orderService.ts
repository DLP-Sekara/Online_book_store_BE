// import Order from '../models/order.model';
// import { OrderModel } from '../utils/interface';

import OrderRepository from "../repositories/OrderRepository";
import { ApiResponse } from "../utils/interfaces/commonInterface";
import {
  OrderDetails,
  OrderIdInterface,
} from "../utils/interfaces/orderInterface";

// export const getAllOrderService=async():Promise<object | string>=>{
//   try{
//     const order=await Order.find();
//     return order;
//   }catch(error){
//     return ('error :'+error);
//   }
// };

// export const saveOrderService=async(data:OrderModel):Promise<object | string>=>{
//   try{

//     //auto increment oid
//     const highestOid= await Order.findOne().sort('-oid').select('oid').lean();
//     const newOid = highestOid ? highestOid.oid + 1 : 1;

//     const temp=data.itemList.map((item) => ({
//       book_name: item.book_name,
//       quantity: item.quantity,
//       price: item.price,
//     }));

//     const dataObj = new Order({
//       oid: newOid,
//       customer_name: data.customer_name,
//       itemList: temp,
//       totalAmount: data.totalAmount,
//       shippingAddress: data.shippingAddress,
//       orderDate: data.orderDate,
//     });

//     const saveResponse=await dataObj.save();
//     return {message:'Order added successfully !',saveResponse};
//   }catch(error){
//     return ('error :'+error);
//   }
// };

// export const searchOrderService=async(data:string):Promise<object | string>=>{
//   try{
//     const searchedOrder = await Order.find({customer_name:data});
//     return searchedOrder;
//   }catch(error) {
//     return ('error :'+error);
//   }
// };
// all;
// search;
// delete
// update;
// create;
const orderService = {
  getAllOrderService: async (
    data: OrderDetails
  ): Promise<ApiResponse<any[]>> => {
    try {
      return OrderRepository.getAllOrdersRepo(data);
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },
  searchOrderService: async (
    data: OrderIdInterface
  ): Promise<ApiResponse<any[]>> => {
    try {
      return OrderRepository.searchOrdersRepo(data);
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },
  deleteOrderService: async (
    data: OrderIdInterface
  ): Promise<ApiResponse<any[]>> => {
    try {
      return OrderRepository.deleteOrdersRepo(data);
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },
  updateOrderService: async (
    data: OrderDetails
  ): Promise<ApiResponse<any[]>> => {
    try {
      return OrderRepository.updateOrdersRepo(data);
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },
  createOrderService: async (
    data: OrderDetails
  ): Promise<ApiResponse<any[]>> => {
    try {
      return OrderRepository.createOrdersRepo(data);
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },
};

export default orderService;
