const express = require("express");
const dotenv = require("dotenv").config();
const cookieeParser = require("cookie-parser");
const cors = require("cors");
const socket = require("socket.io");
const app = express();
const path = require("path");
const connectDB = require("./config/dbconfig");
const PORT = process.env.PORT || 5001;

const userRoutes = require("./routes/user/userRoutes");
const blogRoutes = require("./routes/user/blogRoutes");
const MessageModel = require("./models/MessageModel");
const adminRoutes = require("./routes/adminRoutes/adminRoute");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(cookieeParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/users/blog", blogRoutes);
app.use("/api/admin", adminRoutes);

app.use((err, req, res, next) => {
  // console.error(err);
  console.error(err.message);
  // console.log(err.stack);
  const statusCode = err.statusCode ? err.statusCode : 500;
  res.status(statusCode).json({ message: err.message });
});

const server = app.listen(PORT, () => console.log(`server up at :${PORT}`));

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000", //setting socket io to connect to client
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  // console.log(socket);
  global.chatSocket = socket;
  // console.log("connected",socket);

  socket.on("add-user", (userId) => {
    console.log(`add user: ${userId}`);
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", async (data) => {
    // console.log(data);
    try {
      const { from, to, message } = data;

      const sendUserSocket = onlineUsers.get(to);
      console.log(sendUserSocket, "hi");

      const saveChat = await MessageModel.create({
        message: { text: message },
        users: [from, to],
        sender: from,
      });
      console.log(`saved chats: ${saveChat}`);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.message);
      }
    } catch (err) {
      console.error(err.message, "errr");
    }
  });
});

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
