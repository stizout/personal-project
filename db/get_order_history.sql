select distinct order_id from products
join orders on orders.product_id  = products.id
join order_number on order_number.id  = orders.order_id
where user_id = $1;