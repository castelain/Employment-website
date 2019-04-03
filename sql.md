## Student
- id: int PK NN UN
- username: varchar(255) NN UN
- realname: varchar(255) NN
- password: varchar(255) NN
- school: varchar(255)
- college: varchar(255)
- major: varchar(255)

## Company
- id: int PK UN NN
- username: varchar(255) NN UN
- name: varchar(255) NN UN
- kind: varchar(255) NN
- address: varchar(255) NN
- scale: varchar(255) NN
- email: varchar(255) NN
- link_man: varchar(255) NN
- link_man_tel: varchar(255) NN
- password: varchar(255) NN

## Seminar
- id: int PK UN NN
- company_id: int FK（级联删除，级联更新） NN
- holds_in: datetime NN
- address: varchar(255) NN
- majors: varchar(255)
- company_description: varchar(255)
- job_description: varchar(255)
- salary_description: varchar(255)
- application_process: varchar(255)
- status: int(1) NN DF(0) (0: 未审核, -1: 失败, 1: 成功)
- created_at: timestamp DF(CURRENT_TIMESTAMP) NN

## Resume
- id: int PK NN UN
- student_id: int FK（级联删除，级联更新） NN UN
- email: varchar(255) NN
- sex: int(1) NN
- birthday: datetime NN
- telephone: varchar(255) NN
- will_jobs: varchar(255)
- will_spots: varchar(255)
- will_salary: varchar(255)
- political_status: varchar(255) NN
- introduction: varchar(1024)
- nationality: varchar(255) NN
- address: varchar(255) NN
- marry_status: int(1) NN
- awards: varchar(255) 
- skills: varchar(255)
- experiences: varchar(1024)

## Student_Company
- id: int PK NN UN
- student_id: int NN FK（级联删除，级联更新）
- company_id: int NN FK（级联删除，级联更新）
- message: varchar(2048) NN
- time: timestamp NN DF(CURRENT_TIMESTAMP)
- type: int(1) (0: s->c, 1: c->s) NN

## Administrator
- id: int PK NN UN
- username: varchar(255) NN UN
- realname: varchar(255) NN
- password: varchar(255) NN

## Employment_Policy
- id: int PK NN UN
- title: varchar(255) NN
- created_at: timestamp NN DF(CURRENT_TIMESTAMP)
- content: varchar(4096) NN
  
## Career_Assessment
- id: int PK NN UN
- title: varchar(255) NN
- created_at: timestamp NN DF(CURRENT_TIMESTAMP)
- content: varchar(4096) NN
  
## School_Event
- id: int PK NN UN
- title: varchar(255) NN
- created_at: timestamp NN DF(CURRENT_TIMESTAMP)
- content: varchar(4096) NN
  
## School_College
- id: int PK NN UN
- title: varchar(255) NN
- created_at: timestamp NN DF(CURRENT_TIMESTAMP)
- content: varchar(4096) NN
- majors: varchar(255) NN

## Latest_Notification
- id: int PK NN UN
- title: varchar(255) NN
- created_at: timestamp NN DF(CURRENT_TIMESTAMP)
- content: varchar(4096) NN