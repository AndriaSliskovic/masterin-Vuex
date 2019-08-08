import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import EventCreate from './views/events/EventCreate.vue'
import EventList from './views/events/EventList.vue'
import EventShow from './views/events/EventShow.vue'
import ProbaStatea from './views/probaStatea/ProbaStatea.vue'
import Tabela from './views/tabela/Tabela.vue'
import Tabela2 from './views/tabela2/Tabela2.vue'
import Login from './views/login/Login.vue'
import NProgress from 'nprogress'
import store from '@/store/store'
import NotFound from './views/errorPages/NotFound.vue'
import NetworkIssue from './views/errorPages/NetworkIssue.vue';


Vue.use(Router)



const router= new Router({
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
      path: '/eventlist',
      name: 'event-list',
      component: EventList,
      props:true // We'll set the page parameter, so we want to send it in as a prop
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true,
      //Ucitavanje stranice preko routera
      beforeEnter(routeTo, routeFrom, next) { // before this route is loaded
        store.dispatch('event/fetchEvent', routeTo.params.id).then(() => {
          next()
        })
        .catch(() => next({ name: '404', 
        params: { resource: 'event' } }))
      }
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
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props:true
    },
    {
      path: '/network-issue',
      name: 'network-issue',
      component: NetworkIssue,
      props:true
    },
    //Ruta za hvatanje svih navigacija koje ne odgovaraju putanji ili ne postoji
    {
      path: '*',
      redirect:{name:'404',params: { resource: 'page' }}
    }
  ]
})

router.beforeEach((routeTo, routeFrom, next) => {
  // Start the route progress bar.
  NProgress.start()
  next()
})
router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router
