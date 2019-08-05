<template>
  <BaseLayer>
    <h4>{{user.user.name}}</h4>
    <v-data-table :headers="headers" :items="items" :items-per-page="5" class="elevation-1"></v-data-table>
  </BaseLayer>
</template>

<script>
import EventService from '../../services/EventService'
import { mapState, mapActions } from 'vuex'

export default {
  created() {
    //Rucno pozivanje actiona sa namespaceom
    //this.$store.dispatch('tabela/fetchData')
    //Pozivanje actiona preko mapActions
    this.fetchData()
  },
  updated(){
    
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
      // items: this.$store.events.events,

    }
  },
  methods: mapActions('tabela', ['fetchData']),
  computed: {
    rezultat(){

    },
    ...mapState({user: 'user',tabela: 'tabela',events:'event'})
  }
}
</script>

<style>
</style>
