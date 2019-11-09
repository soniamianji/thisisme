const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const config = require("./confiq/index.json");

// connect to the database and load models
require("./models").connect(config.dbUri);

//json bodyparser
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

//enable cors
app.use(cors({ exposedHeaders: ["Location"] }));

app.get("/", (req, res) => {
  res.status(200).json({ msg: "hello world" });
});

const userRoute = require("./routes/userRoute");
app.use("/userRoute", userRoute);

const port = 5000;

app.listen(port, () => console.log(`server is running on port ${port}`));
