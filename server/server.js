const express = require("express");
const dotenv = require("dotenv").config();
const cookieeParser = require("cookie-parser");
const connectDB = require("./config/dbconfig");
const PORT = process.env.PORT || 5001;
const app = express();

const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieeParser());
connectDB();
app.use("/api/users", userRoutes);                            //API for user routes
app.listen(PORT, () => console.log(`server up at :${PORT}`));
