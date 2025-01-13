import { Types } from "mongoose";

export interface OrderModel {
  _id: Types.ObjectId;
  oid: number;
  customer_name: string;

  itemList: {
    book_name: string;
    quantity: number;
    price: number;
  }[];

  totalAmount: number;
  shippingAddress: string;
  orderDate: Date;
}
