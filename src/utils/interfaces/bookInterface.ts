import { Types } from "mongoose";

export interface BookModel {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  author: string;
  ISBN_number: string;
  price: number;
  type: string;
  cover_image: string;
  status: number;
  publisher: string;
  pub_year: string;
  qty: number;
}
export interface BookDetails {
  page?: number;
  perPage?: number;
  sort?: number;
  bookName?: string | undefined;
}

export interface bookIdInterface {
  _id?: Types.ObjectId;
}
