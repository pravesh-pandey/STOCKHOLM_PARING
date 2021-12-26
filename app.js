const express = require("express");

const app = express();

app.use(express.static("login"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/login/login.html");
});

app.listen(3000, function(){
    console.log("Server is running at port 3000");
})