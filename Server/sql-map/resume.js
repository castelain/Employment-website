let sqlMap = {
    select_all: 'select * from Resume;',
    select_userId: 'select r.id from Resume as r, Student as s where r.student_id = s.id and r.student_id = ?;',
    select_by_id: 'select s.school, s.college, s.major, s.realname, r.email, r.sex, r.birthday, r.telephone, r.will_jobs, r.will_spots, r.will_salary, r.political_status, r.introduction, r.nationality, r.address, r.marry_status, r.awards, r.skills, r.experiences from Resume as r, Student as s where r.id = ? and r.student_id = s.id;',
    add_item: 'insert into Resume(student_id, email, sex, birthday, telephone, will_jobs, will_spots, will_salary, political_status, introduction, nationality, address, marry_status, awards, skills, experiences) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
    update_by_id: 'update Resume set email = ?, sex = ?, birthday = ?, telephone = ?, will_jobs = ?, will_spots = ?, will_salary = ?, political_status = ?, introduction = ?, nationality = ?, address = ?, marry_status = ?, awards = ?, skills = ?, experiences = ? where id = ?;',
    detele_item: 'delete from Resume where id = ?;',
}

module.exports = sqlMap;