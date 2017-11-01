create table admin(
    id serial primary key,
    admin_user_name varchar(180),
    email varchar(180),
    img text,
    auth_id text
)