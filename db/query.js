module.exports = {
    QUERY_READ_ALL: `select
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

    QUERY_WORDS_BY_BOOK: `select
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

    QUERY_BOOK_NAMES: `select
                        b.title,
                        b.authors
                        from BOOK_INFO b`,

    QUERY_BOOK_DETAIL: `select
                        b.title,
                        b.authors,
                        MIN(w.timestamp) as minTime,
                        MAX(w.timestamp) as maxTime,
                        
                        strftime('%d - %m  - %Y ', datetime(MIN(w.timestamp) /1000, 'unixepoch')) formattedMinTime,
                        strftime('%d - %m  - %Y ', datetime(MAX(w.timestamp) /1000, 'unixepoch')) formattedMaxTime,
                        
                        count(*) as allwords
                        FROM
                        WORDS w
                        LEFT JOIN LOOKUPS l
                        on l.word_key=w.id
                        LEFT JOIN BOOK_INFO b
                        on b.guid=l.book_key
                        GROUP BY
                        b.title
                        ORDER BY minTime ASC`,

    QUERY_TIME_PERIOD: `select
                        w.word,
                        l.usage as usage,
                        b.title as book,
                        strftime('%d - %m  - %Y ', datetime(w.timestamp /1000, 'unixepoch')) formattedTime
                        FROM
                        WORDS w
                        LEFT JOIN LOOKUPS l
                        on l.word_key=w.id
                        LEFT JOIN BOOK_INFO b
                        on b.guid=l.book_key
                        where book = ?
                        and
                        formattedTime between ? and ?
                        GROUP BY
                        w.word
                        ORDER BY formattedTime ASC, book ASC`
}