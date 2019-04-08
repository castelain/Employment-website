let sqlMap = {
    select_all: 'select * from Career_Assessment',
    select_by_id: 'select * from Career_Assessment where id = ?',
    add_item: 'insert into Career_Assessment(title, content, created_by) values (?, ?, ?)',
    update_by_id: 'update Career_Assessment set title = ?, content = ? where id = ?',
    detele_item: 'delete from Career_Assessment where id = ?' 
}

module.exports = sqlMap;