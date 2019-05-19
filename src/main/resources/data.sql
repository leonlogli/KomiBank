
create table if not exists persistent_logins ( 
  username varchar(100) not null, 
  series varchar(64) primary key, 
  token varchar(64) not null, 
  last_used timestamp not null
);

INSERT INTO role (id, name) VALUES (1, 'ROLE_ADMIN') 
ON DUPLICATE KEY UPDATE name='ROLE_ADMIN';

INSERT INTO role (id, name) VALUES (2, 'ROLE_USER') 
ON DUPLICATE KEY UPDATE name='ROLE_USER';

INSERT INTO user (id, name, password) VALUES 
(1, 'admin', '$2a$10$hKDVYxLefVHV/vtuPhWD3OigtRyOykRLDdUAp80Z1crSoS1lFqaFS')
ON DUPLICATE KEY UPDATE name='admin', password='$2a$10$hKDVYxLefVHV/vtuPhWD3OigtRyOykRLDdUAp80Z1crSoS1lFqaFS';
 
 INSERT INTO user (id, name, password) VALUES 
(2, 'user', '$2a$10$ByIUiNaRfBKSV6urZoBBxe4UbJ/sS6u1ZaPORHF9AtNWAuVPVz1by')
ON DUPLICATE KEY UPDATE name='user', password='$2a$10$ByIUiNaRfBKSV6urZoBBxe4UbJ/sS6u1ZaPORHF9AtNWAuVPVz1by';

REPLACE into user_role(user_id, role_id) values
(1,1),
(2,2)
;
