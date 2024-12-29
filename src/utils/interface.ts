import { Types } from "mongoose";

export interface BookModel {
  _id: Types.ObjectId;
  bid: number;
  bookName: string;
  bookAuthor: string;
  bookQty: number;
  bookPrice: number;
  bookType: string;
  bookImage?: string;
}

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

export interface CustomerModel {
  _id: Types.ObjectId;
  cus_id: number;
  username: string;
  email: string;
  dob: Date;
  mobile_number: string;
  password: string | any;
  role: string;
}
