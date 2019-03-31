let sqlMap = {
    select_all: 'select * from Resume',
    select_by_id: 'select * from Resume where id = ?',
    add_item: 'insert into Resume(student_id, email, sex, birthday, telephone, will_jobs, will_spots, will_salary, political_status, introduction, nationality, address, marry_status, awards, skills, experiences) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    update_by_id: 'update Resume set email = ?, sex = ?, birthday = ?, telephone = ?, will_jobs = ?, will_spots = ?, will_salary = ?, political_status = ?, introduction = ?, nationality = ?, address = ?, marry_status = ?, awards = ?, skills = ?, experiences = ?',
    detele_item: 'delete from Resume where id = ?',
}

module.exports = sqlMap;