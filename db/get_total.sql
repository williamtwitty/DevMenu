select sum(menu.price) from orders
join menu on orders.menu_id = menu.id
where table_number = $1 and completed is null