import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import cors from "cors";

import userRouter from "./routes/user.routes.js";
import followRouter from "./routes/follow.routes.js";
import blogRouter from "./routes/blog.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use("/users", cors(), userRouter);
app.use("/follows", cors(), followRouter);
app.use("/blogs", cors(), blogRouter);

// app.use(
//   cors(
//     {
//       origin: 'http://localhost:3000',
//     },
//     {
//       methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
//     }
//   )
// );
// const startServer = () =>{
//   app.use((req,res, next) => {
//     res.header("Access-Control-Allow-Origin","*");
//     res.header("Access-Control-Allow-Headers","Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods","PUT, POST, PATCH, DELETE, GET");
//     next();
//   })
// }

// startServer();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
      termsOfService: "http://example.com/terms/",
      contact: {
        name: "API Support",
        url: "http://www.exmaple.com/support",
        email: "support@example.com",
      },
    },

    servers: [
      {
        url: "http://localhost:8000",
        description: "My API Documentation",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// Database set up
const mongoString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.hnb9i.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(mongoString, { useNewUrlParser: true });
mongoose.connection.on("error", function (error) {
  console.log(error);
});
mongoose.connection.on("open", function () {
  console.log("Connected to MongoDB database.");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
