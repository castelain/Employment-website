let sqlMap = {
    select_all: 'select s.id, c.name, s.holds_in, s.address, s.majors, s.company_description, s.job_description, s.salary_description, s.application_process, s.status, s.created_at from Seminar as s, Company as c where s.company_id = c.id ;',
    select_by_id: 'select * from (select s.id, c.name, s.holds_in, s.address, s.majors, s.company_description, s.job_description, s.salary_description, s.application_process, s.status, s.created_at from Seminar as s, Company as c where s.company_id = c.id ) as r where r.id = ?',
    select_by_companyId: 'select * from Seminar where company_id = ?',
    add_item: 'insert into Seminar(company_id, holds_in, address, majors, company_description, job_description, salary_description, application_process) values (?, ?, ?, ?, ?, ?, ?, ?)',
    update_by_id: 'update Seminar set holds_in = ?, address = ?, majors = ?, company_description = ?, job_description = ?, salary_description = ?, application_process = ? where id = ?',
    update_status: 'update Seminar set status = ? where id = ?',
    delele_by_id: 'delete from Seminar where id = ?',
    delete_by_companyId: 'delete from Seminar where company_id = ?',
    select_by_keyword: 'select * from (select s.id, c.name, s.holds_in, s.address, s.majors, s.company_description, s.job_description, s.salary_description, s.application_process, s.status, s.created_at from Seminar as s, Company as c where s.company_id = c.id) as r where r.address = ? or r.majors = ? or r.status = ? or r.name = ? '
}

module.exports = sqlMap;