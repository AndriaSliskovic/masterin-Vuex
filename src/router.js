import Vue from 'vue'
import Router from 'vue-router'
import EventCreate from './views/EventCreate.vue'
import EventList from './views/EventList.vue'
import EventShow from './views/EventShow.vue'
import ProbaStatea from './views/ProbaStatea.vue'
import Tabela from './views/Tabela.vue'
import Layer from './views/Layer.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'layer',
      component: Layer
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
    }
  ]
})
