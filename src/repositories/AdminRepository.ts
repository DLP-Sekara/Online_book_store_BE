import Admin from "../models/admin.model";
import { CustomerRegisterModel } from "../utils/interfaces/customerInterface";
import bcrypt from "bcrypt";

const AdminRepository = {
  saveAdminRepo: async (data: CustomerRegisterModel): Promise<any> => {
    try {
      const existCustomer = await Admin.findOne({
        email: {
          $regex: new RegExp("^" + data.email + "$", "i"),
        },
      });

      if (existCustomer) {
        return {
          success: false,
          message: "Admin Already Exists!",
          data: null,
        };
      }
      // Hash the password
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const admin = new Admin({
        username: data.username,
        email: data.email,
        password: hashedPassword,
        role: data.role,
      });
      const newAdmin = await admin.save();
      return {
        success: true,
        message: "Admin Added Successfully!",
        data: {
          id: newAdmin._id,
          username: newAdmin.username,
          email: newAdmin.email,
          role: newAdmin.role,
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

  loginAdminRepo: async (data: any): Promise<any> => {
    try {
      const existCustomer = await Admin.findOne({
        email: {
          $regex: new RegExp("^" + data.email + "$", "i"),
        },
      });
      if (!existCustomer) {
        return {
          success: false,
          message: "Email or password is incorrect!",
          data: null,
        };
      }

      const isPasswordValid = await bcrypt.compare(
        data.password,
        existCustomer.password
      );
      if (!isPasswordValid) {
        return {
          success: false,
          message: "Email or password is incorrect!",
          data: null,
        };
      }
      return {
        success: true,
        message: "Admin logged in successfully!",
        data: {
          id: existCustomer._id,
          email: existCustomer.email,
          username: existCustomer.username,
          role: existCustomer.role,
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

  getAdminDetailsRepo: async (data: any): Promise<any> => {
    try {
      const existCustomer = await Admin.findOne({
        email: {
          $regex: new RegExp("^" + data.email + "$", "i"),
        },
      });

      if (existCustomer) {
        return {
          success: true,
          message: "Admin Found Successfully!",
          data: {
            id: existCustomer._id,
            email: existCustomer.email,
            username: existCustomer.username,
            role: existCustomer.role,
          },
        };
      }
      return {
        success: false,
        message: "Customer Not Found!",
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

export default AdminRepository