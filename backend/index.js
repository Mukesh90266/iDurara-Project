const express = require("express");
const app = express();

const dotenv = require("dotenv");
const database = require("./src/config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();

// routes
const userRouter = require("./src/routes/user");

const PORT = process.env.PORT || 3000;

//connect db
database.connect();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/v1/auth", userRouter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
