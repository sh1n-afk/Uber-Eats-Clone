// const mysql = require("mysql");

// const connectionConfig = {
//   host: "munch-monkey.cum7wx3ju8z4.us-east-2.rds.amazonaws.com",
//   user: "admin",
//   password: "munchMonkeyAdmin",
//   database: "munch_monkey",
// };

const mongoose = require("mongoose");

const mongoDbConfig = {
  pwd: "munchMonkeyAdmin",
  dbName: "munch_monkey",
};

const mongoConnectionString = `mongodb+srv://root:${mongoDbConfig.pwd}@cluster0.vgownq5.mongodb.net/${mongoDbConfig.dbName}?retryWrites=true&w=majority`;
const mongoOptions = {
  useNewUrlParser: true,
  maxPoolSize: 500,
  wtimeoutMS: 2500,
};

class Database {
  // static pool;
  static async init() {
    mongoose.connect(mongoConnectionString, mongoOptions, (err, res) => {
      if (err) {
        console.log(err);
        console.log("MongoDB connection failed");
      } else {
        console.log("MongoDB connected");
      }
    });
  }
}

module.exports = Database;

//mongo
