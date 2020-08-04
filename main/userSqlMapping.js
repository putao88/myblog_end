/*
 * @Author: houxiaoling 
 * @Date: 2020-07-29 17:18:15 
 * @Last Modified by: houxiaoling
 * @Last Modified time: 2020-08-03 10:53:52
 * @Description:用户相数据库操作
 */
// CRUD SQL语句
var user = {
    insert: 'insert into user(uid, name, password, role, sex) VALUES(?,?,?,?,?)',
    update: 'update user set name=?, sex=?, password=? where uid=?',
    delete: 'delete from user where FIND_IN_SET(uid,?)',
    queryById: 'select * from user where uid=?',
    queryAll: 'select * from user'
  };
  
module.exports = user;
