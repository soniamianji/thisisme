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

const cardRoute = require("./routes/cardRoute");
app.use("/cardRoute", cardRoute);

const googleRoute = require("./routes/googleRoute");
app.use("/googleRoute", googleRoute);

const cardSearch = require("./routes/cardSearch");
app.use("/cardSearch", cardSearch);

const port = 5000;

app.listen(port, () => console.log(`server is running on port ${port}`));
