module.exports = {
    QUERY_READ_ALL  :   `select
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
                        ORDER BY timestamp ASC, book ASC`,

    QUERY_BY_BOOK :     `select
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
                        ORDER BY timestamp ASC, book ASC`,

    QUERY_BOOK_NAMES :  `select
                        b.title,
                        b.authors
                        from BOOK_INFO b` 
}