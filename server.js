let express = require("express");
let app = express();
let reloadMagic = require("./reload-magic.js");
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;
let sha1 = require("sha1");
let multer = require("multer");
let upload = multer({ dest: __dirname + "/upload/" });
let cookieParser = require("cookie-parser");
reloadMagic(app);
let dbo = undefined;
let db = require("");

let url =
  "mongodb+srv://isabella:a@cluster0-nxd5k.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err, db) => {
    dbo = db.db("media-board");
  }
);
let session = {};
app.use(cookieParser());
app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets

// Your endpoints go after this line
app.get("/all-items", (req, res) => {
  console.log("all-items", req.body);
  dbo
    .collectin("Items")
    .find({})
    .toArray((err, items) => {
      if (err) {
        console.log("error", err);
        res.send("fail");
        return;
      }
      console.log("items", items);
      res.send(JSON.stringify(items));
    });
});
app.post("/signup", upload.none(), (req, res) => {
  console.log("signup", req.body);
  let name = req.body.username;
  let pwd = req.body.password;
  console.log(name);
  if (username !== "" && password !== "") {
    dbo.collection("users").findOne({ username: name }, (err, user) => {
      console.log(user, "users");
      if (err) {
        console.log(err, "signup err");
        res.send(JSON.stringify({ success: false }));
        return;
      }
      if (user !== null) {
        console.log("same username");
        res.send(JSON.stringify({ success: false }));
        return;
      } else {
        dbo.collectin("users").insertOne({ name, password: sha1(pwd) });
        res.send(JSON.stringify({ success: true }));
        return;
      }
    });
  }
});
app.post("/login", upload.none(), (req, res) => {
  console.log("login", req.body);
  let name = req.body.username;
  let pwd = req.body.password;
  let hashedPwd = sha1(pwd);
  if (username !== "" && password !== "") {
    dbo.collection("users").findOne({ username: name }, (err, user) => {
      if (err) {
        console.log(err, "login error");
        res.send(JSON.stringify({ success: false }));
        return;
      }
      if (user === null) {
        res.send(JSON.stringify({ success: false }));
        return;
      }
      if (user.password === hashedPwd) {
        let sid = Math.floor(Math.random() * 100000000);
        sessions[sid] = name;
        res.cookie("sid", sid);
        res.send(JSON.stringify({ success: true, username: name, sid: sid }));
        return;
      }
    });
  }
});

// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
