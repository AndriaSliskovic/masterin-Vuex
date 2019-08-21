import EventService from '../../services/EventService'
import { async } from 'q';

export const namespaced = true

export const state = {
  companies: {},
  groups:{},
  selectedGroup:"",
  dataObject:{},
  initialModules:null,
  selectedModules:null

}
export const mutations = {
  FETCH_COMPANIES(state, payload) {
    state.companies = payload
  },
  FETCH_INITIAL_MODULES(state, payload){
    state.initialModules=payload
  },
  SELECTED_COMPANY(state,payload){
    console.log(payload)
    state.selectedCompany = payload
  },
  SELECTED_GROUP(state,payload){
    console.log(payload)
  },
  SELECTED_MODULES(state,payload){
    console.log(payload)
    state.selectedModules=payload 
    // state.selectedModules.push(payload)
    console.log(state.selectedModules)
  },
  SEND_DATA(state,payload){
    //console.log(payload)
    state.dataObject=payload
  }
}
export const actions = {
  fetchCompanies({ commit }) {
    //Koristi isti metod za ucitavanja kompanija i grupa
    return EventService.getCompanies()
      .then(response => {
        commit('FETCH_COMPANIES', response.data)
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  },

  fetchInitialModules({ commit }){
    return EventService.getFeatures()
    .then(response=>{
      //console.log(response.data)
      commit('FETCH_INITIAL_MODULES',response.data)
    })
    .catch(error => {
      console.log('There was an error:', error.response)
    })
  },

  getSelectedModules({commit},compGuid){
     return EventService.getSelectedFeatures(compGuid)
    .then(response=>{
      console.log(response.data)
      commit('SELECTED_MODULES',response.data)
    })
    .catch(error=>{
      console.log(`Error message : ${error.response}`)
    })
  },

  selectedCompany({commit},company){
    commit('SELECTED_COMPANY',company)
  },
  selectedGroup({commit},group){
    commit('SELECTED_GROUP',group)
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