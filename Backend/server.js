// require("dotenv").config();

// const express = require("express");

// const mongoose = require("mongoose");

// const app = express();

// //Cors
// var cors = require("cors");
// const corsOptions = {
//   origin: "*",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

// //middleware
// app.use(express.json());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   res.header("Access-Control-Allow-Methods", "*");
//   res.header("Access-Control-Allow-Credentials", "true");

//   next();
// });

// //connect
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     //listen for requests
//     app.listen(process.env.PORT, () => {
//       console.log("connected to db", process.env.PORT);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
