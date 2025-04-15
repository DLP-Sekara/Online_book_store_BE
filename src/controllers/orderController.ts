/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../utils/interfaces/commonInterface";
import orderService from "../services/orderService";

const orderController = {
  getAllOrders: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { page, perPage, sort, customerName }: any = req.query;
    try {
      const parsedPage = parseInt(page, 10) || 1;
      const parsedPerPage = parseInt(perPage, 10) || 10;
      const parsedSort = parseInt(sort) || 1;
      const response: ApiResponse<any[]> =
        await orderService?.getAllOrderService({
          page: parsedPage,
          perPage: parsedPerPage,
          sort: parsedSort,
          customerName,
        });
      return res.status(200).json({
        success: response?.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  },
  searchOrders: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { id }: any = req.query;

    try {
      const response: ApiResponse<any[]> =
        await orderService?.searchOrderService({
          _id: id,
        });
      return res.status(200).json({
        success: response?.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteOrders: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { orderId }: any = req?.query;

      if (!orderId) {
        return res.status(200).json({
          success: false,
          message: "Order ID Required!",
          data: null,
        });
      }
      const response: ApiResponse<any[]> =
        await orderService?.deleteOrderService({
          _id: orderId,
        });
      return res.status(200).json({
        success: response?.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  },
  updateOrders: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { status }: any = req.body;
    // try {
    //    if (!title || !bookId) {
    //      return res.status(200).json({
    //        success: false,
    //        message: "Book ID & Book Name Required!",
    //        data: null,
    //      });
    //    }
    //   const response: ApiResponse<any[]> =
    //     await orderService?.getAllOrderService({
    //       page: parsedPage,
    //       perPage: parsedPerPage,
    //       sort: parsedSort,
    //     });
    //   return res.status(200).json({
    //     success: response?.success,
    //     message: response.message,
    //     data: response.data,
    //   });
    // } catch (error) {
    //   next(error);
    // }
  },
  createOrders: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { page, perPage, sort, customerName }: any = req.query;
    try {
      const parsedPage = parseInt(page, 10) || 1;
      const parsedPerPage = parseInt(perPage, 10) || 10;
      const parsedSort = parseInt(sort) || 1;
      const response: ApiResponse<any[]> =
        await orderService?.getAllOrderService({
          page: parsedPage,
          perPage: parsedPerPage,
          sort: parsedSort,
        });
      return res.status(200).json({
        success: response?.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default orderController;
