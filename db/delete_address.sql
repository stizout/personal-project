delete from addresses where id = $1;

select * from users
join addresses on user_id = users.id
-- you need the user.id also
where users.id = $2;


