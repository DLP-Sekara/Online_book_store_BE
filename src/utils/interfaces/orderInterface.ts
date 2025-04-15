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

export interface OrderDetails {
  page?: number;
  perPage?: number;
  sort?: number;
  customerName?: string | undefined;
}

export interface OrderIdInterface {
  _id?: Types.ObjectId;
}

export interface OrderEmailInterface {
  email: string;
}
