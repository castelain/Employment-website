let sqlMap = {
    user: {
        add: 'insert into user(id,name, password) values (?,?,?)',
        select_name: 'select * from user where name = ? and password = ?',
        update_user: 'update user set'
    }
};

module.exports = sqlMap;