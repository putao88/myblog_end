/*
 * @Author: houxiaoling 
 * @Date: 2020-07-29 17:18:15 
 * @Last Modified by: houxiaoling
 * @Last Modified time: 2020-07-29 17:18:45
 * @Description:用户相数据库操作
 */
// CRUD SQL语句
var user = {
    insert: 'insert into t_user(uid, name, password, role, sex) VALUES(?,?,?,?,?)',
    update: 'update t_user set name=?, sex=?, password=? where uid=?',
    delete: 'delete from t_user where FIND_IN_SET(uid,?)',
    queryById: 'select * from t_user where uid=?',
    queryAll: 'select * from t_user'
  };
  
module.exports = user;
