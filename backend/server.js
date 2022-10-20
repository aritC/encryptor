require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");
const {
  scrypt,
  randomFill,
  createCipheriv,
  scryptSync,
  createDecipheriv,
} = require("crypto");
const { v4: uuidv4 } = require("uuid");
const { ADD_ENCRYPTED, GET_ENCRYPTED, UPDATE_ENCRYPTED } = require("./query");

app.use(cors());
app.use(bodyparser.json());
const PORT = process.env.PORT;
const algo = process.env.ALGO;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
pool.getConnection(function (err, conn) {
  console.log("DB Connection Successfull!");
  pool.releaseConnection(conn);
});

app.post("/api/encrypt", (req, res) => {
  let errors = [];
  if (!req.body.text || req.body.text.length == 0) {
    errors.push("Body Cannot be empty");
  }

  if (!req.body.password || req.body.password.length == 0) {
    errors.push("Password Cannot be empty");
  }

  if (req.body.viewCount == null || req.body.viewCount === 0) {
    //null or undefined
    errors.push("View Count cannot be empty or 0. -1 means unlimited views");
  }

  if (errors.length != 0) {
    return res.status(400).send({ message: errors });
  }

  let { text, viewCount, password } = req.body;
  let uid = uuidv4();
  let expireDate = new Date();
  // Will add this when I allow users to set custom expiry date
  // expireDate.setDate(expireDate.getDate() + 5);
  scrypt(password, "salt", 32, (err, key) => {
    if (err) {
      console.log("Error Encrypting data", err);
      return res.status(500).send({ message: ["Error Encrypting data"] });
    }

    randomFill(Buffer.alloc(16), (err, iv) => {
      if (err) {
        console.log("Error Encrypting data", err);
        return res.status(500).send({ message: ["Error Encrypting data"] });
      }
      const cipher = createCipheriv(algo, key, iv);
      let encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
      let values = [uid, encrypted, iv.toString("hex"), viewCount, expireDate];

      pool.query(ADD_ENCRYPTED, [values], (err, results) => {
        if (err) {
          console.log("Error Inserting data: ", err);
          return res.status(500).send({ message: ["Error Inserting data"] });
        }
        console.log(results);
        return res.status(200).send({
          message: "Data Encrypted Suceesfully",
          link: `${process.env.domain}/decrypt/${uid}`,
          password: password,
        });
      });
    });
  });
});

app.get("/api/:uid", (req, res) => {
  let { uid } = req.params;
  let value = [uid];
  pool.query(GET_ENCRYPTED, [value], (err, results) => {
    if (err) {
      console.log("Error Getting data: ", err);
      return res.status(500).send({ message: ["Error Getting data"] });
    }

    if (results == null || results.length == 0) {
      console.log("Text ID not found");
      return res.status(400).send({
        message: ["Text ID not found. Please check the link"],
        isValid: false,
      });
    }

    let { viewCount } = results[0];
    if (viewCount === 0) {
      return res.status(400).send({ message: ["Link has Expired"] });
    }

    return res.status(200).send({ message: ["Found"], uid: uid });
  });
});

decryptText = (encryptedText, password, stringIv) => {
  const key = scryptSync(password, "salt", 32);

  const iv = Buffer.from(stringIv, "hex");
  const decipher = createDecipheriv(algo, key, iv);
  decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

app.post("/api/decrypt", (req, res) => {
  let errors = [];

  if (!req.body.password || req.body.password.length == 0) {
    errors.push("Password Cannot be empty");
  }

  if (!req.body.uid || req.body.uid.length == 0) {
    errors.push("UID Cannot be empty");
  }

  if (errors.length != 0) {
    return res.status(400).send({ message: errors });
  }

  let { uid, password } = req.body;
  let value = [uid];
  pool.query(GET_ENCRYPTED, [value], (err, results) => {
    if (err) {
      console.log("Error Getting data: ", err);
      return res.status(500).send({ message: ["Error Getting data"] });
    }

    if (results == null || results.length == 0) {
      console.log("Text ID not found");
      return res.status(404).send({
        message: ["Text ID not found. Please check the link"],
        isValid: false,
      });
    }
    try {
      let { encryptedText, iv, viewCount } = results[0];
      let decrypted = decryptText(encryptedText, password, iv);

      if (viewCount === 0) {
        return res.status(400).send({ message: ["Link has Expired"] });
      }

      if (viewCount !== -1) {
        viewCount -= 1;
        pool.query(UPDATE_ENCRYPTED, [[viewCount], [uid]], (err) => {
          if (err) {
            console.log("Error Updating Count data: ", err);
            return res.status(500).send({ message: ["Error Updating Count"] });
          }
        });

        return res
          .status(200)
          .send({ message: ["Success"], decryptedText: decrypted });
      }
    } catch (err) {
      console.log("Decrpytion Error: ", err);
      return res.status(400).send({
        message: ["Decryption Error. Please Check Key"],
        isValid: false,
      });
    }
  });
});

app.get("/*", (req, res) => {
  res.status(404).send("Invalid URL");
});

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
