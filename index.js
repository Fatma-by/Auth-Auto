const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes")

const connect = require("./db")

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome to my express app" });
});
app.use("/auth", authRouter)




app.listen(8080, () => {
  console.log("express listening on port 8080");
});