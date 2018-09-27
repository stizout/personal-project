insert into order_number
(user_id)
values
($1)
returning id;