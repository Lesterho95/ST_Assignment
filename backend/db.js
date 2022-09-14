const mysql = require("mysql")

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Liverpoolrocks12",
  database: "stassignment",
})

db.getConnection(function (err) {
  if (err) {
    return console.error("error: " + err.message)
  }
  console.log("Connected to the MySQL server.")
})

module.exports = db
