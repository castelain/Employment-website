let sqlMap = {
    select_all: 'select * from Student',
    select_by_id: 'select * from Student where id = ?',
    add_item: 'insert into Student(username, realname, password, school, college, major) values (?, ?, ?, ?, ?, ?)',
    update_by_id: 'update Student set username = ?, realname = ?, password = ?, school = ?, college = ?, major = ? where id = ?',
    update_password: 'update Student set password = ? where id = ?',
    detele_item: 'delete from Student where id = ?',
    select_by_keyword: 'select * from Student where username = ? or realname = ? or school = ? or college = ? or major = ? ',
}

module.exports = sqlMap;