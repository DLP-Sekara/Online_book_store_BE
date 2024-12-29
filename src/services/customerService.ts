import Customer from "../models/customer.model";
import { CustomerModel } from "../utils/interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../utils/config";

//get customer
export const getAllCustomerService = async (): Promise<object | string> => {
  try {
    const customer = await Customer.find();
    return customer;
  } catch (error) {
    return "error :" + error;
  }
};

//save customer
export const saveCustomerService = async (
  data: CustomerModel
): Promise<any> => {
  try {
    const findCustomer: any = await Customer.findOne({
      email: data.email,
    }).lean();
    if (findCustomer) {
      return null;
    }

    const dataObj = new Customer();

    //auto increment cid
    const highestCid = await Customer.findOne()
      .sort("-cus_id")
      .select("cus_id")
      .lean();
    const newCid = highestCid ? Number(highestCid.cus_id) + 1 : 1;

    //bcrypt password
    const tempPassword = data.password;
    const hash: string = await bcrypt.hash(tempPassword, 10);

    dataObj.cus_id = newCid;
    dataObj.username = data.username;
    dataObj.email = data.email;
    dataObj.password = hash;
    dataObj.role = "customer";

    const saveResponse = await dataObj.save();
    return { message: "Account created successfully !", saveResponse };
  } catch (error) {
    return error;
  }
};

//login customer
export const logInCustomer = async (data: CustomerModel): Promise<any> => {
  try {
    const findCustomer = await Customer.findOne({ email: data.email });
    if (findCustomer) {
      const isValid = await bcrypt.compare(
        data.password,
        findCustomer.password
      );
      if (isValid) {
        return findCustomer;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};

//get new access token
export const refreshService = async (refreshToken: string) => {
  try {
    const verifyRefToken = jwt.verify(refreshToken, config.jwt_secretRe_key);
    if (!verifyRefToken) {
      console.log("Unauthorized");
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const tempEmail = verifyRefToken.email;
      const findCustomer = await Customer.findOne({ email: tempEmail });
      if (findCustomer) {
        return findCustomer;
      }
    }
  } catch (err) {
    console.log("Get New Access Token Eroor ", err);
    return { err: "Cannot Get New Access Token" };
  }
};

//get userDetails
export const getUserDetails = async (userAccToken: string) => {
  try {
    const verifyAccToken = jwt.verify(userAccToken, config.jwt_secret_key);
    if (!verifyAccToken) {
      console.log("Unauthorized");
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const userEmail = verifyAccToken.email;
      const findCustomer = await Customer.findOne({ email: userEmail });
      // const secret = config.jwt_secret_key;
      if (findCustomer !== null) {
        const userData = {
          email: findCustomer.email,
          name: findCustomer.username,
          userRoll: findCustomer.role,
        };
        return {
          userData,
        };
      } else {
        throw new Error("Customer not found");
      }
    }
  } catch (err) {
    console.log("Get New Access Token Eroor ", err);
    throw new Error("Cannot Get New Access Token");
  }
};

//delete customer
export const deleteCustomerService = async (
  data: string
): Promise<object | string> => {
  try {
    const deleteResponse = await Customer.findByIdAndDelete(data);
    return { message: "Customer Deleted successfuly !", deleteResponse };
  } catch (error) {
    return "error :" + error;
  }
};
