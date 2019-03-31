const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let latest_notification_router = require('./api/latest_notification');
let career_assessment_router = require('./api/career_assessment'); 
let employment_policy_router = require('./api/employment_policy');
let school_college_router = require('./api/school_college');
let school_event_router = require('./api/school_event');
let student_router = require('./api/student');
let company_router = require('./api/company');
let seminar_router = require('./api/seminar');
let resume_router = require('./api/resume');
let message_router = require('./api/student_company');
let administrator_router = require('./api/administrator');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// 定义全局方法 
formateResult = function() {
    let result = {};
    if(arguments.length === 2){
        result = {
            code: arguments[0],
            msg: arguments[1]
        };
    }else if(arguments.length === 3){
        result = {
            code: arguments[0],
            msg: arguments[1],
            data: arguments[2]
        }
    }
    return result;
}

app.use('/', latest_notification_router);
app.use('/', career_assessment_router);
app.use('/', employment_policy_router);
app.use('/', school_college_router);
app.use('/', school_event_router);
app.use('/', student_router);
app.use('/', company_router);
app.use('/', seminar_router);
app.use('/', resume_router);
app.use('/', message_router);
app.use('/', administrator_router);

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});