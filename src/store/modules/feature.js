import EventService from '../../services/EventService'

export const namespaced = true

export const state = {
  companies: [],
  selectedCompany:"",
  dataObject:{},
  modules:[]

}
export const mutations = {
  UCITAJ_PODATKE(state, payload) {
    state.companies = payload
  },
  UCITAJ_MODULE(state, payload){
    state.modules=payload
  },
  SELECTED_COMPANY(state,payload){
    console.log(payload)
    state.selectedCompany = payload
  },
  SEND_DATA(state,payload){
    console.log(payload)
    state.dataObject=payload
  }
}
export const actions = {
  fetchData({ commit }) {
    return EventService.getCompanies()
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
      console.log(company)
    commit('SELECTED_COMPANY',company)
  },
  submitForm({commit},object){
    console.log(object)
    commit('SEND_DATA',object)

    //return EventService.editFeatures(object)
  }
}

export const gettes = {

}