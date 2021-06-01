const sqlite3 = require("sqlite3");

// open the database
let db = new sqlite3.Database("./server/data/locations.db", sqlite3.OPEN_READONLY, (err) => {
        if (err) {
            // Cannot open database
            console.error(err.message);
            throw err;
        } else {
            console.log("Connected to the SQLite database.");
        }
    }
);

module.exports = db;
