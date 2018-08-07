select * from orders 
join products on products.id  = product_id
where order_id = $1;

