  
create table if not exists user(
  uid varchar(16) primary key,
  name varchar(16),
  password varchar(16),
  role int,
  sex varchar(16)
) default charset = utf8;

insert into user values('1','boys','111',0,'男');
insert into user values('2','putao','111',0,'女');

commit;