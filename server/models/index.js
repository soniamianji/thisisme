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


  // mongoose.connection.on("error", err => {
  //   console.error(`Mongoose connection error: ${err}`);
  //   process.exit(1);
  // });
  mongoose.connect(uri, { useNewUrlParser: true })
    .then(() => console.log("Mongodb connected"))
    .catch(err => console.log(err));
  //mongoose.Promise = global.Promise;

  // load models
  require("./card");
};
