module.exports = {
    queryAll: function (db, sql) {
        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }

            rows.forEach(row => {
                console.log(row);
            });
        })
    },
    queryEachBook: function (db, sql, book) {
        db.each(sql, [book], (err, row) => {
            if (err) {
                throw err;
            }

            console.log(row);
        });
    }
}