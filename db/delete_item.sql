delete from orders 
where id = $1 and table_number= $2
returning *;