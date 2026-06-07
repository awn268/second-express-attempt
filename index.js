import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import db from "./db.js";

const app = express();
const port = process.env.PORT;

let posta_data = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.connect();

db.query("SELECT * FROM posta", (err, res) => {
    if (err) {
        console.error("Error executing query", err.stack);
    } else {
        posta_data = res.rows;
    }

    db.end();
});

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/piping", (req, res) => {
    res.render("piping.ejs");
});

app.get("/reading", (req, res) => {
    res.render("reading.ejs", {data: posta_data});
});

app.get("/writing", (req, res) => {
    res.render("writing.ejs");
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});