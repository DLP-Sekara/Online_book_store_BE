import Order from "../models/order.model";
import { OrderDetails } from "../utils/interfaces/orderInterface";

const OrderRepository = {
  getAllOrdersRepo: async (data: OrderDetails): Promise<any> => {
    try {
      const { page, perPage, sort, customerName }: any = data;

      let query: any = {};
      if (customerName) {
        query.username = { $regex: customerName, $options: "i" };
      }

      let sortCriteria: any = {};
      switch (sort) {
        case 1:
          sortCriteria = { updatedAt: -1 }; // Descending order
          break;
        case 2:
          sortCriteria = { updatedAt: 1 }; // Ascending order
          break;
        default:
          sortCriteria = { updatedAt: -1 }; // Default to descending
          break;
      }

      const skip = (page - 1) * perPage;

      const allOrders = await Order.find(query)
        .sort(sortCriteria)
        .skip(skip)
        .limit(perPage)
        .lean();

      if (!allOrders) {
        return {
          success: true,
          message: "No Customers To Fetch!",
          data: [],
        };
      }
      const processOrders = async (allOrders: any) =>
        Promise.all(
          allOrders.map(async (order: any) => ({
            id: order?._id,
            status: order?.status,
            order_details: order?.order_details,
          }))
        );

      const processedOrders = await processOrders(allOrders);
      const totalCount = await Order.countDocuments(query);
      const totalPages = Math.ceil(totalCount / perPage);
      return {
        success: true,
        message: "Orders Fetched Successfully!",
        data: {
          page,
          totalPages,
          totalCount,
          customers: processedOrders,
        },
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },
  searchOrdersRepo: async (data: any): Promise<any> => {
    try {
      const existOrder = await Order.findOne({
        customer_id: {
          $regex: new RegExp("^" + data._id + "$", "i"),
        },
      });

      if (existOrder) {
        return {
          success: true,
          message: "Order Found Successfully!",
          data: {
            id: existOrder?._id,
            status: existOrder?.status,
            order_details: existOrder?.order_details,
          },
        };
      }
      return {
        success: false,
        message: "Order Not Found!",
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },
  deleteOrdersRepo: async (data: any): Promise<any> => {
    try {
      const order = await Order.findOne({ _id: data?._id }).lean();
      if (!order) {
        return {
          success: false,
          message: "Can Not Fetch Order Data!",
          data: null,
        };
      }
      await Order.findByIdAndDelete({ _id: data?._id });
      return {
        success: true,
        message: "Order Deleted Successfully!",
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },
  updateOrdersRepo: async (data: any): Promise<any> => {
    try {
      const updatedOrder = await Order.findOneAndUpdate(
        { _id: data?._id },
        {
          status: data?.status,
        }
      );
      if (!updatedOrder) {
        return {
          success: false,
          message: "Order Not Found Or Could Not Be Updated!",
          data: null,
        };
      }
      return {
        success: true,
        message: "Order Updated Successfully!",
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },
  createOrdersRepo: async (data: any): Promise<any> => {
    try {
      return {
        success: false,
        message: "Order Not Found!",
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  },
};

export default OrderRepository;
