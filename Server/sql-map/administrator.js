let sqlMap = {
    select_all: 'select * from Administrator',
    select_by_id: 'select * from Administrator where id = ?',
    add_item: 'insert into Administrator(username, realname, password) values (?, ?, ?)',
    update_by_id: 'update Administrator set username = ?, realname = ?, password =? where id = ?',
    update_password_by_id: 'update Administrator set password =? where id = ?',
    detele_item: 'delete from Administrator where id = ?'
}

module.exports = sqlMap;