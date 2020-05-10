SELECT
    *
FROM
    data
WHERE
  date(date)
BETWEEN ? AND ?
ORDER BY
  date;