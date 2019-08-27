import Vue from 'vue'
import Vuex from 'vuex'
import * as user from '@/store/modules/user.js'
import * as event from '@/store/modules/event.js'
import * as proba from '@/store/modules/proba.js'
import * as tabela from '@/store/modules/tabela.js'
import * as feature from '@/store/modules/feature.js'
import * as notification from '@/store/modules/notification.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    event,
    proba,
    tabela,
    feature,
    notification
  },
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ]
  },
  mutations: {
    POVECAJ_BROJ(state,value) {
      state.proba.broj.br += value
    }
  }
})
