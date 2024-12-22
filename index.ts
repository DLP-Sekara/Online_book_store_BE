// import express from 'express';
// import mongoose from 'mongoose';
// const app = express();
// import cors from 'cors';
// import dotenv from 'dotenv';

// // import bookRoute from './src/routes/bookRoute';
// // import orderRoute from './src/routes/orderRoute';
// // import customerRoute from './src/routes/customerRoute';
// // import cookieParser from 'cookie-parser';

// dotenv.config();
// const port = process.env.PORT;

// app.use(express.json());
// app.use(cookieParser());

// app.use(
//    cors({
//       origin: "*",
//       methods: "*",
//       credentials: true,
//    })
// );
  
// app.use(express.urlencoded({ extended: true }));

// //routes
// app.use('/book',bookRoute);
// app.use('/customer',customerRoute);
// app.use('/order',orderRoute);

// //mongoDb connection 
// const url=process.env.DATABASE_URL;
// mongoose.connect(url);
// const con=mongoose.connection;
// con.on('error', console.error.bind(console, 'MongoDB connection error:'));
// con.once('open', () => {
//   console.log('MongoDB connected successfully');
// });

// app.get('/',(req,res)=>{
//   console.log('get request has come');
//   res.send('hello mongo');
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
