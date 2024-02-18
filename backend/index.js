const express = require("express");
const server = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./db");
const jwt = require("jsonwebtoken");
const jwtkey = "abc";
server.use(cors());
server.use(bodyParser.json());

//write
server.post("/register", async (req, res) => {
  let user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  const token = jwt.sign({ username: req.body.username }, jwtkey);
  await user.save();
  console.log(token);
  res.json({ token });
});

//read
server.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "username and password are required" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    if (user.password !== req.body.password) {
      return res.status(401).json({ error: "password dont match" });
    }
    // Generate JWT token
    const token = jwt.sign({ username: req.body.username }, jwtkey);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const auth = (req, res, next) => {
  try {
    const token = req.get("Authorization").split("Bearer")[1];
    var decoded = jwt.verify(token, jwtkey);
    if (decoded.username) {
      next();
    }
    res.status(401).json({ error: "Auth FAIL" });
  } catch (error) {
    res.status(401).json({ error: "Auth fAiL" });
  }
};

server.listen(8080, () => {
  console.log("serverr started");
});
