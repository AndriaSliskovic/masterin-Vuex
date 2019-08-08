<template>
  <BaseLayer>
    <h4>{{user.user.name}}</h4>
    <v-data-table :headers="headers" :items="items" :items-per-page="5" class="elevation-1"></v-data-table>
  </BaseLayer>
</template>

<script>
import EventService from '../../services/EventService'
import { mapState, mapActions } from 'vuex'
import NProgress from 'nprogress'
import store from '@/store/store'

export default {
  //Pozivanje actionCreatora kroz komponentni router
  beforeRouteEnter(routeTo, routeFrom, next) {
        NProgress.start()
        //Ne moze da koristi this
        store.dispatch('tabela/fetchData').then(() => {
          NProgress.done() // When the action is done complete progress bar
          next() // Only once this is called does the navigation continue
        })
      },

  data() {
    return {
      items: [],
      ime:'Andraaa',
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Location', value: 'location' },
        { text: 'Description', value: 'description' },
        { text: 'Category', value: 'category' }
      ],

    }
  },
  methods: mapActions('tabela', ['fetchData']),
  computed: {
    ...mapState({user: 'user',tabela: 'tabela',events:'event'})
  },
    mounted(){
    this.items=this.tabela.stavke
    console.log(`mounted fetchovani podaci ${this.tabela.stavke}`)
  },
}
</script>

<style>
</style>
