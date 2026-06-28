import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import db from "./db.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


//BASIC GET REQUESTS, NO DB CONNECTION REQURIED
app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.get("/POTS", (req, res) => {
    res.render("POTS.ejs");
});

app.get("/support", (req, res) => {
    res.render("support.ejs");
});

app.get("/writing", (req, res) => {
    res.render("writing.ejs");
});


//MORE COMPLEX GET REQUESTS, DB CONNECTION REQUIRED
app.get("/reading", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM posta");
        res.render("reading.ejs", { data: result.rows });
    } catch (err) {
        console.error("Error executing query", err.stack);
        res.status(500).send("Database query failed");
    }
});

app.get("/posts/:slug", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM posta WHERE slug = $1",
            [req.params.slug]
        );
        res.render("post.ejs", 
            { data: result.rows[0] }
        );
    } catch (err) {
        console.error("Error executing query", err.stack);
        res.status(500).send("Database query failed");
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});