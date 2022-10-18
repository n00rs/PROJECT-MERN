const express = require("express");
const dotenv = require("dotenv").config();
const cookieeParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/dbconfig");
const PORT = process.env.PORT || 5001;
const app = express();

const userRoutes = require("./routes/userRoutes");
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieeParser());
connectDB();
app.use("/api/users", userRoutes);

// app.get('/',(req,res)=>{
//     var users = {
//         agent: req.header('user-agent'), // User Agent we get from headers
//         referrer: req.headers['referer'], //  Likewise for referrer
//         ip: req.header('x-forwarded-for') || req.connection.remoteAddress, // Get IP - allow for proxy
//         screen: { // Get screen info that we passed in url post data
//           width: req.param('width'),
//           height: req.param('height')
//         }
//       };
//     console.log(req.body,users);
//     res.send(users)
// })                          //API for user routes

app.listen(PORT, () => console.log(`server up at :${PORT}`));
  