let sqlMap = {
    select_all: 'select * from School_College',
    select_by_id: 'select * from School_College where id = ?',
    add_item: 'insert into School_College(title, content) values (?, ?)',
    update_by_id: 'update School_College set title = ?, content = ? where id = ?',
    detele_item: 'delete from School_College where id = ?' 
}

module.exports = sqlMap;