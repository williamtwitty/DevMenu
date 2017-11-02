create table checkout(
id serial primary key,
table_number int references orders(table_number),
total decimal,
completed text )