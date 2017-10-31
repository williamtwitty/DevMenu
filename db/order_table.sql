create table orders(
    id serial primary key,
    menu_id references menu(id),
    checkout_id references checkout(id),
    quantity integer
)