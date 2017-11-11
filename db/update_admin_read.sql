update chat
set has_been_read = 'We will work on it'
where id = $1
returning *;