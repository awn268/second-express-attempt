import express from "express";

const app = express();
const port = process.env.PORT;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/piping", (req, res) => {
    res.render("piping.ejs");
});

app.get("/reading", (req, res) => {
    res.render("reading.ejs");
});

app.get("/writing", (req, res) => {
    res.render("writing.ejs");
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});