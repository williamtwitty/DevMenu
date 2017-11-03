update orders
set completed = 'done'
where table_number = $1 and completed is null
returning *;