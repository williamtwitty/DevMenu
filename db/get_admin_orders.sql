select * from orders
left outer join menu
on orders.menu_id = menu.id
where orders.completed is null
group by orders.id, menu.id
order by orders.table_number asc;

-- select * from orders
-- left outer join menu
-- on orders.menu_id = menu.id
-- where orders.completed is null 
-- and orders.menu_id is not null and orders.table_number is not null
-- group by orders.id, menu.id
-- order by orders.table_number asc;