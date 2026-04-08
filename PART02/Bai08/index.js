const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

function connectWithRetry() {
  const db = mysql.createConnection({
    host: "mysql",
    user: "user",
    password: "user123",
    database: "mydb",
  });

  db.connect((err) => {
    if (err) {
      console.log("Retry connecting in 5s...");
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log("Connected to MySQL 🚀");
    }
  });

  return db;
}

const db = connectWithRetry();

db.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err);
    return;
  }
  console.log("Connected to MySQL 🚀");
});

app.get("/", (req, res) => {
  db.query("SELECT 1 + 1 AS result", (err, results) => {
    if (err) return res.send("DB error");
    res.send(`DB working: ${results[0].result}`);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

