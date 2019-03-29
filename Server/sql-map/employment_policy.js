let sqlMap = {
    select_all: 'select * from Employment_Policy',
    select_by_id: 'select * from Employment_Policy where id = ?',
    add_item: 'insert into Employment_Policy(title, content) values (?, ?)',
    update_by_id: 'update Employment_Policy set title = ?, content = ? where id = ?',
    detele_item: 'delete from Employment_Policy where id = ?' 
}

module.exports = sqlMap;