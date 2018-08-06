select * from users
join addresses on user_id = users.id
where users.id = $1;