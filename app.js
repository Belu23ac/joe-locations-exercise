const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require('cookie-parser');
const app = express();

app.use(cors());
app.use("/static", express.static("public"));
app.use((req, res, next) => {
    console.log("----- HTTP Request -----");
    console.log(`Method: ${req.method}`); // HTTP Method
    console.log(`URL: ${req.originalUrl}`); // Requested URL
    console.log("Headers:", req.headers); // Request Headers
    console.log(`IP: ${req.ip}`); // IP Address
    console.log("------------------------");
    next();
});
app.use(cookieParser());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/locations", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "locations.html"));
});

app.get("/res", (req, res) => {
  res.send("Response message from server");
});

app.get("/cookie", (req, res) => {
  res.cookie("taste", "chocolate");
  res.send("Cookie set");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
