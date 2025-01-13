import { Types } from "mongoose";

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
