import EventService from '../../services/EventService'

export const namespaced = true

export const state = {
  companies: [],
  selectedCompany:""

}
export const mutations = {
  UCITAJ_PODATKE(state, payload) {
    state.companies = payload
  },
  SELECTED_COMPANY(state,payload){
    console.log(payload)
    state.selectedCompany = payload
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
  selectedCompany({commit},company){
      console.log(company)
    commit('SELECTED_COMPANY',company)
  }
}

export const gettes = {

}