create table checkout(
    order_id references order(id),
    table_number int,
    total decimal 
)
