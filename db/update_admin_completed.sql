update chat
set has_been_completed = 'done'
where id = $1
returning *;