import Vue from 'vue'
import Router from 'vue-router'
import EventCreate from './views/EventCreate.vue'
import Home from './views/Home.vue'
import EventShow from './views/EventShow.vue'
import ProbaStatea from './views/ProbaStatea.vue'
import Tabela from './views/Tabela.vue'
import Tabela2 from './views/Tabela2.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'pocetna',
      component: Home
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true
    },
    {
      path: '/proba',
      name: 'proba',
      component: ProbaStatea,
      props: true
    },
    {
      path: '/tabela',
      name: 'tabela',
      component: Tabela,
      props: true
    },
    {
      path: '/tabela2',
      name: 'tabela2',
      component: Tabela2,
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
