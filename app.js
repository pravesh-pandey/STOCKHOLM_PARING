const express = require("express");
//const request = require("request");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/frontpage/index.html");
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login/login.html");
})

app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/signup/signup1.html");
})

app.post("/login", (req, res) => {
    const fname = req.body.lusername;
    const fpwd = req.body.lpassword;

    var data = {
      members: [
        {
          username: fname,
          password: fpwd,
          },
      ],
    };
  
    const jsonData = JSON.stringify(data);
    if(button == "onclick"){
      res.send("<h1>login is complete</h1>");
    }

  });

app.listen(3000, function() {
    console.log("Server is running on port 3000.");
})