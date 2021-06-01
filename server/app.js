const express = require("express");
const path = require('path');
const db = require("./database.js");

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

app.get("/locations", (req, res) => {
    const searchString = req.query.q;

    if (!searchString) {
        res.status(500).send({
            error: "Empty query string.",
        });
    } else if (searchString.length < 2) {
        res.status(500).send({
            error: "Ensure query string contains two or more characters.",
        });
    } else {
        const sql = `SELECT name
          FROM locations
          WHERE name LIKE '${searchString}%'
          ORDER BY length(name) asc`;

        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }

            const results = rows.map((x) => x.name);
            res.json(results);
        });
    }
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
