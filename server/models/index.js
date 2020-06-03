const mongoose = require("mongoose");

module.exports.connect = uri => {
  // mongoose.connect(uri, (err, res) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   else {
  //     console.log('connected');
  //   }
  // })
  // mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  // // plug in the promise library:
  // mongoose.Promise = global.Promise;

  // mongoose.connection.on("error", err => {
  //   console.error(`Mongoose connection error: ${err}`);
  //   process.exit(1);
  // });
  mongoose.connect('mongodb://localhost:27017/creative_ideas', { useNewUrlParser: true })
    .then(() => console.log("Mongodb connected"))
    .catch(err => console.log(err));

  // load models
  require("./card");
};
