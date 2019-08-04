import EventService from '../../services/EventService'

export const namespaced = true

export const state = {
  stavke: []
}
export const mutations = {
  UCITAJ_PODATKE(state, payload) {
    state.stavke = payload
    console.log(this.stavke)
  }
}
export const actions = {
  fetchData({ commit }) {
    EventService.getEvents()
      .then(response => {
        console.log(response.data)
        commit('UCITAJ_PODATKE', response.data)
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  }
}

export const gettes = {

}
