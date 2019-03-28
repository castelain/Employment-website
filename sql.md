# user

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
- company_id: int FK NN
- holds_in: timestamp NN
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
- student_id: int FK UN
- email: varchar(255) NN
- 


# admin