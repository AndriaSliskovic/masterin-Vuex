import EventService from '../../services/EventService'

export const namespaced = true

export const state = {
  companies: {},
  selectedCompany:"",
  dataObject:{},
  modules:[],
  selectedModules:[]

}
export const mutations = {
  UCITAJ_PODATKE(state, payload) {
    state.companies = payload
  },
  UCITAJ_MODULE(state, payload){
    state.modules=payload
  },
  SELECTED_COMPANY(state,payload){
    //console.log(payload)
    state.selectedCompany = payload
  },
  SELECTED_MODULES(state,payload){
    state.selectedModules=payload
  },
  SEND_DATA(state,payload){
    //console.log(payload)
    state.dataObject=payload
  }
}
export const actions = {
  async fetchData({ commit }) {
    return await EventService.getCompanies()
      .then(response => {
        commit('UCITAJ_PODATKE', response.data)
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  },

  fetchModules({ commit }){
    return EventService.getFeatures()
    .then(response=>{
      //console.log(response.data)
      commit('UCITAJ_MODULE',response.data)
    })
    .catch(error => {
      console.log('There was an error:', error.response)
    })
  },

  selectedCompany({commit},company){
    commit('SELECTED_COMPANY',company)
  },
  selectedModules({commit},modules){
    console.log(`selected modules : ${modules}`)
    commit('SELECTED_MODULES',modules)
  },
  submitForm({commit},object){
    console.log(object)
    commit('SEND_DATA',object)
    return EventService.editFeatures(object)
  }
}

export const gettes = {

}