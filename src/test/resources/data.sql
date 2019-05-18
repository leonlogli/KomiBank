
create table if not exists persistent_logins ( 
  username varchar(100) not null, 
  series varchar(64) primary key, 
  token varchar(64) not null, 
  last_used timestamp not null
);

delete from  user_role;
delete from  role;
delete from  user;


INSERT INTO role (id, name) VALUES 
(1, 'ROLE_ADMIN'),
(2, 'ROLE_USER')
;

INSERT INTO user (id, name, password) VALUES 
(1, 'admin', '$2a$10$hKDVYxLefVHV/vtuPhWD3OigtRyOykRLDdUAp80Z1crSoS1lFqaFS'),
(2, 'user', '$2a$10$ByIUiNaRfBKSV6urZoBBxe4UbJ/sS6u1ZaPORHF9AtNWAuVPVz1by');

insert into user_role(user_id, role_id) values
(1,1),
(2,2)
;
