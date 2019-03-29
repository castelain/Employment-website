let sqlMap = {
    select_all: 'select * from School_Event',
    select_by_id: 'select * from School_Event where id = ?',
    add_item: 'insert into School_Event(title, content) values (?, ?)',
    update_by_id: 'update School_Event set title = ?, content = ? where id = ?',
    detele_item: 'delete from School_Event where id = ?' 
}

module.exports = sqlMap;