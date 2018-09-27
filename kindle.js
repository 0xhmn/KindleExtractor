const sqlite3 = require('sqlite3').verbose();

// CONSTANTS
const BOOK_THE_IDIOT = "The Idiot";

// QUERIES
let read_all = `select
                w.word,
                l.usage as usage
                ,w.timestamp as timestamp
                ,b.title as book
                FROM
                WORDS w
                LEFT JOIN LOOKUPS l
                on l.word_key=w.id
                LEFT JOIN BOOK_INFO b
                on b.guid=l.book_key
                GROUP BY
                w.word
                ORDER BY timestamp ASC, book ASC`;

let read_book = `select
                w.word,
                l.usage as usage
                ,w.timestamp as timestamp
                ,b.title as book
                FROM
                WORDS w
                LEFT JOIN LOOKUPS l
                on l.word_key=w.id
                LEFT JOIN BOOK_INFO b
                on b.guid=l.book_key
                where book = ?
                GROUP BY
                w.word
                ORDER BY timestamp ASC, book ASC`;

let db = new sqlite3.Database('./vocab_sep_26.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error("Error Happened", err.message);
    }

    console.log("Connected to database");
});

queryEachBook(db, read_book, BOOK_THE_IDIOT);

db.close((err) => {
    if (err) {
        console.error(err.message);
    }

    console.log("DB is closes!");
});

function queryAll(db, sql) {
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }

        rows.forEach(row => {
            console.log(row);
        });
    })
}

function queryEachBook(db, sql, book) {
    db.each(sql, [book], (err, row) => {
        if (err) {
            throw err;
        }

        console.log(row);
    });
}