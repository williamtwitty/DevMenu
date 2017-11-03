select menu.name, menu.price, menu.image from orders
join menu on orders.menu_id = menu.id
where table_number = $1 and completed is null
group by orders.id, menu.id
order by count(menu.name)
;