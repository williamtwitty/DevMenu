create table orders(
    id serial primary key,
    menu_id references menu(id),
    table_number int, 
    completed text
)