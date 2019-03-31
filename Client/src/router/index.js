import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/built-components/Homepage'
import CommonQuestions from '@/components/built-components/Common-Questions'
import EmploymentInformation from '@/components/built-components/employment-information/Employment-Information'
import SchoolIntroduction from '@/components/built-components/school-introduction/School-Introduction'
import EmploymentPolicy from '@/components/built-components/employment-information/Employment-Policy'
import CareerAssessment from '@/components/built-components/employment-information/Career-Assessment'
import MajorIntroduction from '@/components/built-components/school-introduction/Major-Introduction'
import SchoolHistory from '@/components/built-components/school-introduction/School-History'
import NotFound from '@/components/built-components/NotFound'
import SeminarList from '@/components/built-components/seminars/Seminar-List'
import SeminarDetail from '@/components/built-components/seminars/Seminar-Detail'
import NotificationList from '@/components/built-components/latest-notification/Notification-List'
import NotificationDetail from '@/components/built-components/latest-notification/Notification-Detail'
import MajorDetail from '@/components/built-components/school-introduction/Major-Detail'
import AssessmentDetail from '@/components/built-components/employment-information/Assessment-Detail'
import PolicymentDetail from '@/components/built-components/employment-information/Policy-Detail'
import Login from '@/components/built-components/login/Login'
import Register from '@/components/built-components/register/Register'
import Student from '@/components/built-components/login/student/Student'
import SeeCompany from '@/components/built-components/login/student/See-Company'
import UpdatePassword from '@/components/built-components/login/student/Update-Password'
import Logout from '@/components/built-components/login/student/Logout'
import Message from '@/components/built-components/login/student/Message'
import Company from '@/components/built-components/login/company/Company'
import Administrator from '@/components/built-components/login/administrator/Administrator'
import Create from '@/components/built-components/login/student/profile/Create'
import Delete from '@/components/built-components/login/student/profile/Delete'
import See from '@/components/built-components/login/student/profile/See'
import Update from '@/components/built-components/login/student/profile/Update'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: Homepage
    },
    {
      path: '/common-questions',
      name: 'common-questions',
      component: CommonQuestions
    },
    {
      path: '/employment-information',
      name: 'employment-information',
      component: EmploymentInformation,
      children: [
        {
          path: 'employment-policy',
          name: 'employment-policy',
          component: EmploymentPolicy
        },
        {
          path: 'career-assessment',
          name: 'career-assessment',
          component: CareerAssessment
        }
      ]
    },
    {
      path: '/assessment-detail/:id',
      name: 'assessment-detail',
      component: AssessmentDetail
    },
    {
      path: '/policyment-detail/:id',
      name: 'policyment-detail',
      component: PolicymentDetail
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/school-introduction',
      name: 'school-introduction',
      component: SchoolIntroduction,
      children: [
        {
          path: 'major-introduction',
          name: 'major-introduction',
          component: MajorIntroduction
        },
        {
          path: 'school-history',
          name: 'school-history',
          component: SchoolHistory
        }
      ]
    },
    {
      path: '/major-detail/:id',
      name: 'major-detail',
      component: MajorDetail
    },
    {
      path: '/seminar-list',
      name: 'seminar-list',
      component: SeminarList
    },
    {
      path: '/seminar-detail/:id',
      name: 'seminar-detail',
      component: SeminarDetail
    },
    {
      path: '/notification-list',
      name: 'notification-list',
      component: NotificationList
    },
    {
      path: '/notification-detail/:id',
      name: 'notification-detail',
      component: NotificationDetail
    },
    // 学生部分路由
    {
      path: '/student',
      name: 'student',
      component: Student,
      children: [
        {
          path: 'update-password',
          name: 'update-password',
          component: UpdatePassword
        },
        {
          path: 'create-profile',
          name: 'create-profile',
          component: Create
        },
        {
          path: 'delete-profile',
          name: 'delete-profile',
          component: Delete
        },
        {
          path: 'see-profile',
          name: 'see-profile',
          component: See
        },
        {
          path: 'update-profile',
          name: 'update-profile',
          component: Update
        },
        {
          path: 'logout',
          name: 'logout',
          component: Logout
        },
        {
          path: 'see-company',
          name: 'see-company',
          component: SeeCompany
        },
        {
          path: 'message',
          name: 'message',
          component: Message
        }
      ]
    },
    // 企业部分路由
    {
      path: '/company/:id',
      name: 'company',
      component: Company
    },
    // 管理员部分路由
    {
      path: '/administrator/:id',
      name: 'administrator',
      component: Administrator
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound
    }
  ]
})
