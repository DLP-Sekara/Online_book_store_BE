import Customer from "../models/customer.model";
import {
  CustomerDetails,
  CustomerModel,
  CustomerRegisterModel,
} from "../utils/interfaces/customerInterface";
import bcrypt from "bcrypt";

const CustomerRepository = {
  getAllCustomersRepo: async (data: CustomerDetails): Promise<any> => {
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

      const allCustomers = await Customer.find(query)
        .sort(sortCriteria)
        .skip(skip)
        .limit(perPage)
        .lean();

      if (!allCustomers) {
        return {
          success: true,
          message: "No Customers To Fetch!",
          data: [],
        };
      }

      const processCustomers = async (allCustomers: any) =>
        Promise.all(
          allCustomers.map(async (customer: any) => ({
            id: customer?._id,
            username: customer?.username,
            email: customer?.email,
            dob: customer?.dob,
            mobile_number: customer?.mobile_number,
            address: customer?.address,
            role: customer?.role,
          }))
        );

      const processedCustomers = await processCustomers(allCustomers);
      const totalCount = await Customer.countDocuments(query);
      const totalPages = Math.ceil(totalCount / perPage);
      return {
        success: true,
        message: "Customers Fetched Successfully!",
        data: {
          page,
          totalPages,
          totalCount,
          customers: processedCustomers,
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

  saveCustomerRepo: async (data: CustomerRegisterModel): Promise<any> => {
    try {
      const existCustomer = await Customer.findOne({
        email: {
          $regex: new RegExp("^" + data.email + "$", "i"),
        },
      });

      if (existCustomer) {
        return {
          success: false,
          message: "Customer Already Exists!",
          data: null,
        };
      }
      // Hash the password
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const customer = new Customer({
        username: data.username,
        email: data.email,
        password: hashedPassword,
        role: data.role,
      });
      const newCustomer = await customer.save();
      return {
        success: true,
        message: "Customer Added Successfully!",
        data: {
          id: newCustomer._id,
          username: newCustomer.username,
          email: newCustomer.email,
          role: newCustomer.role,
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

  loginCustomerRepo: async (data: any): Promise<any> => {
    try {
      const existCustomer = await Customer.findOne({
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
        message: "Customer logged in successfully!",
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

  updateCustomerRepo: async (data: CustomerModel): Promise<any> => {
    try {
      const existCustomer = await Customer.findOne({
        _id: { $ne: data?._id },
      });
      console.log(data);
      if (!existCustomer) {
        return {
          success: false,
          message: "Customer Not Found!",
          data: null,
        };
      }
      const updatedCustomer = await Customer.findOneAndUpdate(
        { _id: data?._id },
        data
      );
      console.log(updatedCustomer);
      if (!updatedCustomer) {
        return {
          success: false,
          message: "Customer Could Not Be Updated!",
          data: null,
        };
      }
      return {
        success: true,
        message: "Customer Updated Successfully!",
        data: {
          id: existCustomer._id,
          email: existCustomer.email,
          username: existCustomer.username,
          role: existCustomer.role,
          address: existCustomer.address,
          mobile_number: existCustomer.mobile_number,
          dob: existCustomer.dob,
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

  getCustomerDetailsRepo: async (data: any): Promise<any> => {
    try {
      const existCustomer = await Customer.findOne({
        email: {
          $regex: new RegExp("^" + data.email + "$", "i"),
        },
      });

      if (existCustomer) {
        return {
          success: true,
          message: "Customer Found Successfully!",
          data: {
            id: existCustomer._id,
            email: existCustomer.email,
            username: existCustomer.username,
            role: existCustomer.role,
            address: existCustomer.address,
            mobile_number: existCustomer.mobile_number,
            dob: existCustomer.dob,
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

  deleteCustomerRepo: async (data: any): Promise<any> => {
    try {
      const customer = await Customer.findOne({ _id: data?._id }).lean();
      if (!customer) {
        return {
          success: false,
          message: "Can Not Fetch Customer Data!",
          data: null,
        };
      }
      await Customer.findByIdAndDelete({ _id: data?._id });
      return {
        success: true,
        message: "Customer Deleted Successfully!",
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

export default CustomerRepository;