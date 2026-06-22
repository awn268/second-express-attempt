import express from "express";
import pg from "pg";
import dotenv from "dotenv";
// import db from "./db.js";

dotenv.config();

const app = express();
const port = process.env.LOCAL_PORT;

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});

db.connect();

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

app.get("/piping", (req, res) => {
    res.render("piping.ejs");
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