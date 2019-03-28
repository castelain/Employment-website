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
    {
      path: '*',
      name: 'not-found',
      component: NotFound
    }
  ]
})
