import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import db from "./db.js";

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/piping", (req, res) => {
    res.render("piping.ejs");
});

app.get("/reading", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM posta");
        res.render("reading.ejs", { data: result.rows });
    } catch (err) {
        console.error("Error executing query", err.stack);
        res.status(500).send("Database query failed");
    }
});

app.get("/writing", (req, res) => {
    res.render("writing.ejs");
});

app.get("/posts/:slug", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM posta WHERE slug = $1",
            [req.body.slug]
        );
        res.render("post.ejs", 
            { data: result.rows }
        );
    } catch (err) {
        console.error("Error executing query", err.stack);
        res.status(500).send("Database query failed");
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});