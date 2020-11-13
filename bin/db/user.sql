  
create table if not exists user(
  uid varchar(16) primary key,
  name varchar(16),
  realName varchar(200),
  password varchar(16),
  role varchar(16),
  avatar varchar(200),
  token varchar(200)
) default charset = utf8;

insert into system values('1','putao', '葡萄', '111111', 'admin', 'xxx','');


create table if not exists article(
  id varchar(16) primary key,
  type varchar(100),
  title varchar(255),
  content TEXT(65535),
  time varchar(16)
) default charset = utf8;

create table if not exists whisper(
  id varchar(16) primary key,
  content TEXT(65535),
  time varchar(16),
  date varchar(16),
  like_count int,
  comment_count int
) default charset = utf8;

insert into whisper values('1','一直听说牛油果吃起来像肥皂、肥肉，虽然很难吃，但是价格却很贵，我还是想尝试一下。今天公司新到了新西兰牛油果，这是新西兰牛油果是第一次在中国上市，个头比普通牛油果大了一倍，被誉为“超牛果”。好奇心驱使我尝了一颗，第一次吃牛油果没有见识，切开牛油果费了好大劲，切成了这样。', '12:25', '2018/01/01', 1200, 2000);
insert into whisper values('2','一直听说牛油果吃起来像肥皂、肥肉，虽然很难吃，但是价格却很贵，我还是想尝试一下。今天公司新到了新西兰牛油果，这是新西兰牛油果是第一次在中国上市，个头比普通牛油果大了一倍，被誉为“超牛果”。好奇心驱使我尝了一颗，第一次吃牛油果没有见识，切开牛油果费了好大劲，切成了这样。', '12:25', '2018/01/01', 1200, 2000);
insert into whisper values('3','一直听说牛油果吃起来像肥皂、肥肉，虽然很难吃，但是价格却很贵，我还是想尝试一下。今天公司新到了新西兰牛油果，这是新西兰牛油果是第一次在中国上市，个头比普通牛油果大了一倍，被誉为“超牛果”。好奇心驱使我尝了一颗，第一次吃牛油果没有见识，切开牛油果费了好大劲，切成了这样。', '12:25', '2018/01/01', 1200, 2000);
insert into whisper values('4','一直听说牛油果吃起来像肥皂、肥肉，虽然很难吃，但是价格却很贵，我还是想尝试一下。今天公司新到了新西兰牛油果，这是新西兰牛油果是第一次在中国上市，个头比普通牛油果大了一倍，被誉为“超牛果”。好奇心驱使我尝了一颗，第一次吃牛油果没有见识，切开牛油果费了好大劲，切成了这样。', '12:25', '2018/01/01', 1200, 2000);

create table if not exists leacots(
  id varchar(16) primary key,
  father_id varchar(16),
  status int,
  name varchar(200),
  level int,
  like int,
  content TEXT(65535),
  comment_replys TEXT(65535),
    email varchar(100),
  website varchar(100),
  replyer varchar(200),
  time varchar(50)
) default charset = utf8;

create table if not exists article_classify(
  id int auto_increment primary key not null,
  father_id int,
  name varchar(255),
  time varchar(60)
) default charset = utf8;

commit;