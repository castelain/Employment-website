let sqlMap = {
    select_all: 'select * from Student_Company',
    select_to_company: 'select * from Student_Company where company_id = ? and type = 0',
    select_to_student: 'select * from Student_Company where student_id = ? and type = 1',
    add_to_company: 'insert into Student_Company(student_id, company_id, message, type) values (?, ?, ?, 0)',
    add_to_student: 'insert into Student_Company(student_id, company_id, message, type) values (?, ?, ?, 1)',
    detele_item: 'delete from Student_Company where id = ?'
}

module.exports = sqlMap;