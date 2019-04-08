let sqlMap = {
    select_all: 'select * from Latest_Notification',
    select_by_id: 'select * from Latest_Notification where id = ?',
    add_item: 'insert into Latest_Notification(title, content, created_by) values (?, ?, ?)',
    update_by_id: 'update Latest_Notification set title = ?, content = ? where id = ?',
    detele_item: 'delete from Latest_Notification where id = ?' 
}

module.exports = sqlMap;