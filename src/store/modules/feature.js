import EventService from '../../services/EventService'
import { async } from 'q';
import { stat } from 'fs';

export const namespaced = true

export const state = {
  companies: {},
  selectedCompanyGuid:null,
  groups:[],
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
  GET_COMPANY_GROUPS(state,payload){
    state.groups=payload
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
  fetchCompanies({ commit,dispatch }) {
    //Koristi isti metod za ucitavanja kompanija i grupa
    return EventService.getCompanies()
      .then(response => {
        commit('FETCH_COMPANIES', response.data)
      })
      .catch(error => {
        const notification={
          type:'error',
          message:`Error on server side ! : ${error.response}`
        }
        dispatch('notification/add',notification,{root:true})
      })
  },

  fetchInitialModules({ commit }){
    return EventService.getFeatures()
    .then(response=>{
      commit('FETCH_INITIAL_MODULES',response.data)
    })
    .catch(error => {
      console.log('There was an error:', error.response)
    })
  },

  getSelectedModules({commit},compGuid){
     return EventService.getSelectedFeatures(compGuid)
    .then(response=>{
      commit('SELECTED_MODULES',response.data)
    })
    .catch(error=>{
      console.log(`Error message : ${error.response}`)
    })
  },
  getCompanyGroups({commit},companyId){
    return EventService.getCompanyGroups(companyId)
   .then(response=>{
     var items = response.data.d.map(ug =>  {
        return {
          id : ug.COMP_USERGROUP_ID,
          name : ug.GROUP_NAME,
          guid : ug.GUID
        }
     })
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
  submitForm({commit,dispatch},object){
    commit('SEND_DATA',object)
    return EventService.editFeatures(object)
    .then(
      ()=>{
        const notification={
          type:'success',
          message:`Data successfully changed !`
        }
        dispatch('notification/add',notification,{root:true})
      }).catch(error=>{
        const notification={
          type:'error',
          message:`Failed to send data !`
        }
        dispatch('notification/add',notification,{root:true})
        throw error
      })

  }
}

export const gettes = {

}