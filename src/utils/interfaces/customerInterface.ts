import { Types } from "mongoose";

export interface CustomerModel {
  _id: Types.ObjectId;
  username: string;
  email: string;
  dob: Date | undefined;
  mobile_number: string | undefined;
  address: string | undefined;
  role: string | undefined;
}

export interface CustomerRegisterModel {
  username: string;
  email: string;
  password: string | any;
  role: string | undefined;
}

export interface CustomerLoginModel {
  email: string;
  password: string | any;
}
export interface CustomerDetails {
  page?: number;
  perPage?: number;
  sort?: number;
  customerName?: string | undefined;
}

export interface customerIdInterface {
  _id?: Types.ObjectId;
}

export interface customerEmailInterface {
 email: string;
}