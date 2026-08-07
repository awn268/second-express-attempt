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


//-----------------BASIC GET REQUESTS, NO DB CONNECTION REQURIED-------------------
app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.get("/support", (req, res) => {
    res.render("support.ejs");
});


//-------------------MORE COMPLEX GET REQUESTS, DB CONNECTION REQUIRED------------------

//Render the reading page with all of its posts
app.get("/reading", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM posta WHERE category = 'reading'");
        res.render("reading.ejs", { data: result.rows });
    } catch (err) {
        console.error("Error executing query", err.stack);
        res.status(500).send("Database query failed");
    }
});

//Render the writing page with all of its posts
app.get("/writing", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM posta WHERE category = 'writing';");
        res.render("writing.ejs", { data: result.rows });
    } catch (err) {
        console.error("Error executing query", err.stack);
        res.status(500).send("Database query failed");
    }
})

//Render the POTS page with all of its posts
app.get("/POTS", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM posta WHERE category = 'POTS'");
        res.render("POTS.ejs", { data: result.rows });
    } catch (err) {
        console.error("Error executing query", err.stack);
        res.status(500).send("Database query failed");
    }
});

//Render an individual

app.get("/posts/:slug", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM posta WHERE slug = $1;",
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