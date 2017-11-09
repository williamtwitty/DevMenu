insert into chat(table_number, message)
values($1,$2)
RETURNING *;