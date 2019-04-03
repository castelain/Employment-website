let sqlMap = {
    select_all: 'select * from Company',
    select_by_id: 'select * from Company where id = ?',
    select_by_username: 'select * from Company where username = ?',
    search_item: 'select * from Company where username = ? and password = ?',
    add_item: 'insert into Company(username, name, kind, address, scale, email, link_man, link_man_tel, password) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    update_by_id: 'update Company set username = ?, name = ?, kind = ?, address = ?, scale = ?, email = ?, link_man = ?, link_man_tel = ?, password = ? where id = ?',
    update_password: 'update Company set password = ? where id = ?',
    detele_item: 'delete from Company where id = ?',
    select_by_keyword: 'select * from Company where username = ? or name = ? or kind = ? or address = ? or scale = ? or email = ? or link_man = ? or link_man_tel = ?'
}

module.exports = sqlMap;