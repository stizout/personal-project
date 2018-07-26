insert into orders
(user_id, product_id)
values
(${user_id}, ${product_id});
SELECT id from orders where user_id = ${user_id};