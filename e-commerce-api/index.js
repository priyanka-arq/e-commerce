const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dbConfig = require("./app/config");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./app/routes/user");
const authRoute = require("./app/routes/auth");
const productRoute = require("./app/routes/product");
const cartRoute = require("./app/routes/cart");
const orderRoute = require("./app/routes/order");
const stripeRoute = require("./app/routes/stripe");
const cors = require("cors");

mongoose
  .connect(
    `mongodb+srv://priyanka:${process.env.MONGODB_PASSWORD}@${dbConfig.HOST}/${dbConfig.DB}?retryWrites=true&w=majority`
  )
  .then(() => console.log("DBConnection Successful"))
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());

app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000");
});
