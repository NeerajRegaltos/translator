const translate = require('translate-google');
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const { code } = require("./language");
const app = express();



app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'))

var keyArray = Object.keys(code);

app.get("/", (req, res) => {
    res.render("home", { options: keyArray });
});


app.post("/ans", async (req, res) => {
    const { text, lang } = req.body;
    for (var i = 0; i < keyArray.length; i++) {
        if (keyArray[i] === lang) {
            var x = code[lang];
            const result = await translate(text, { to: x })
            res.render("ans", { sentence: result });
        }
    }


});

app.post("/info", (req, res) => {
    res.render("info")
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, function () {
    console.log("server has started on port ");
})