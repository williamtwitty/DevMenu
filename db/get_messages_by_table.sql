select * from chat
where table_number = $1 and has_been_completed is null;