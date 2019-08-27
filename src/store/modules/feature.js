import EventService from '../../services/EventService'
import { async } from 'q';
import { stat } from 'fs';

export const namespaced = true

export const state = {
  companies: {},
  selectedCompanyGuid:null,
  selectedCompany:null,
  groups:[],
  selectedGroupGuid:"",
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
  SELECTED_COMPANY_GUID(state,payload){
    // console.log(payload)
    state.selectedCompanyGuid = payload
  },
  SELECTED_COMPANY_OBJECT(state,payload){
    state.selectedCompany=payload
  },
  GET_COMPANY_GROUPS(state,payload){
    state.groups=payload
  },

  SELECTED_GROUP(state,payload){
    console.log(`selektovana grupa ${payload}`)
    state.selectedGroupGuid=payload

  },
  SELECTED_MODULES(state,payload){
    state.selectedModules=payload 
  },
  CLEAN_MODULES(state){
    state.selectedModules=null
  },
  SEND_DATA(state,payload){
    console.log(payload)
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
        console.log('There was an error :', error.response)
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
      // console.log(response.data)
      commit('SELECTED_MODULES',response.data)
    })
    .catch(error=>{
      console.log(`Error message : ${error.response}`)
    })
  },
  getCompanyGroups({commit},companyId){
    //console.log(`grupe za kompaniju ${companyId}`)
    return EventService.getCompanyGroups(companyId)
   .then(response=>{
     //console.log(`response za kompaniju ${response.data.d}`)
     var items = response.data.d.map(ug =>  {
        return {
          id : ug.COMP_USERGROUP_ID,
          name : ug.GROUP_NAME,
          guid : ug.GUID
        }
     })
     //console.log(items)
      commit('GET_COMPANY_GROUPS',items)
   })
   .catch(error=>{
     console.log(`Error message : ${error.response}`)
   })
 },

  selectedCompanyGuid({commit},companyGuid){
    commit('SELECTED_COMPANY_GUID',companyGuid)
  },
  selectedCompanyObject({commit},company){
    commit('SELECTED_COMPANY_OBJECT',company)
  },
  selectedGroupGuid({commit},group){
    commit('SELECTED_GROUP',group)
  },
  selectedModules({commit},modules){
    commit('SELECTED_MODULES',modules)
  },
  cleanModules({commit}){
    commit('CLEAN_MODULES')
  },
  submitForm({commit},object){
    commit('SEND_DATA',object)
    return EventService.editFeatures(object)
  }
}

export const gettes = {

}