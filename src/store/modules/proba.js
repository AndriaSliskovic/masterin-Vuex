// const INITIAL_STATE={
//     probaBool:null
// }
export const namespaced = true
export const state = {
  naziv: {
    id: '12',
    name: 'Pocetni state'
  },
  broj: {
    br: 0
  },
  string: {
    tekst: 'lala'
  }
}
export const mutations = {
  POVECAJ_BROJ(state) {
    state.broj.br += 1
  }
}
export const actions = {}

export const gettes = {}
