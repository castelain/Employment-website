let sqlMap = {
    select_all: 'select * from Seminar',
    select_by_id: 'select * from Seminar where id = ?',
    select_by_companyId: 'select * from Seminar where company_id = ?',
    add_item: 'insert into Seminar(company_id, holds_in, address, majors, company_description, job_description, salary_description, application_process) values (?, ?, ?, ?, ?, ?, ?, ?)',
    update_by_id: 'update Seminar set holds_in = ?, address = ?, majors = ?, company_description = ?, job_description = ?, salary_description = ?, application_process = ? where id = ?',
    update_status: 'update Seminar set status = ? where id = ?',
    delele_by_id: 'delete from Seminar where id = ?',
    delete_by_companyId: 'delete from Seminar where company_id = ?',
    select_by_keyword: 'select * from Seminar as s where s.address = ? or s.majors = ? or (select id from company where name = ?) = s.company_id '
}

module.exports = sqlMap;