let sqlMap = {
    select_all: 'select * from Student_Company',
    select_to_company: 'select sc.id, sc.student_id, sc.company_id, sc.time, sc.message, s.realname from Student_Company as sc, Student as s where sc.company_id = ? and sc.type = 0 and sc.student_id = s.id',
    select_to_student: 'select sc.id, sc.student_id, sc.company_id, sc.time, sc.message, c.name from Student_Company as sc, Company as c where sc.student_id = ? and sc.type = 1 and sc.company_id = c.id',
    add_to_company: 'insert into Student_Company(student_id, company_id, message, type) values (?, ?, ?, 0)',
    add_to_student: 'insert into Student_Company(student_id, company_id, message, type) values (?, ?, ?, 1)',
    detele_item: 'delete from Student_Company where id = ?'
}

module.exports = sqlMap;