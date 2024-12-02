require("dotenv").config();
const express = require("express");
// const router  = require('./src/routes/routes')
// const transactionRoute = require('./src/routes/TransactionRoute')
const app = express();
const PORT = process.env.PORT;
// const connectDb = require('./src/utils/app.utils')
const cors = require("cors");
const connectDb = require("./src/utils/app.utils");
const router = require("./src/routes/authenticationRoutes");
// const productRouter = require("./src/routes/adminRoutes/productRoute");
const adminProductRouter = require("./src/routes/adminRoutes/productRoute");
const adminUserRouter = require("./src/routes/adminRoutes/userRoute");
const productRouter = require("./src/routes/productRoutes");
const adminCategoryRouter = require("./src/routes/adminRoutes/categoryRoue");

app.use(express.json());

var corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type",
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/users/", router);
app.use('/api/product/',productRouter)
app.use("/admin/product/", adminProductRouter);
app.use("/admin/users/", adminUserRouter);
app.use("/admin/category/", adminCategoryRouter);

// app.use('/api/users/',router)
// app.use('/api/transactions/',transactionRoute)

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
  });
});
