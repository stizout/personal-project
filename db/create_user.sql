insert into users
(name, email, auth0id, joined)
values
(${name}, ${email}, ${auth0id}, ${joined})
returning *;