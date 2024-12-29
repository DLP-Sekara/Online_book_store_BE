import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bookRoute from "./src/routes/bookRoute";
import orderRoute from "./src/routes/orderRoute";
import customerRoute from "./src/routes/customerRoute";

dotenv.config();

const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    methods: "*",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/book", bookRoute);
app.use('/customer',customerRoute);
// app.use('/order',orderRoute);

// MongoDB connection
const url: any = process.env.DATABASE_URL;
mongoose.connect(url);
const con = mongoose.connection;
con.on("error", console.error.bind(console, "MongoDB connection error:"));
con.once("open", () => {
  console.log("MongoDB connected successfully");
});

// Routes
app.get("/", (req, res) => {
  console.log("GET request received");
  res.send("Hello, MongoDB!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
