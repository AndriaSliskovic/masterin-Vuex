<template>
  <BaseLayer>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left">Title</th>
          <th class="text-left">Location</th>
          <th class="text-left">Description</th>
          <th class="text-left">Category</th>
          <th class="text-left">Edit</th>
          <th class="text-left">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <!-- <tr> -->
          <td>{{item.title}}</td>
          <td>{{item.location}}</td>
          <td>{{item.description}}</td>
          <td >{{item.category}}</td>
          <td>
            <v-btn color="primary" @click="clickEdit(item.id)">Edit {{item.id}}</v-btn>
          </td>
          <td>
            <v-btn color="error" @click="clickDelete(item.id)">Delete</v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </BaseLayer>
</template>

<script>
import EventService from '@/services/EventService.js'
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
  methods: {
  ...mapActions('tabela', ['fetchData']),
  
            clickEdit:function(id){
              console.log(`kliknuto edit ${id}`)
            },
            clickDelete:function(id){
              console.log(`kliknuto delete ${id}`)
            },
  },

  computed: {
    ...mapState({ user: 'user', tabela: 'tabela', events: 'event' })
  },

  mounted(){
    this.items=this.tabela.stavke
    console.log(`mounted fetchovani podaci ${this.tabela.stavke}`)
  },
  data() {
    return {
      items: [],
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Location', value: 'location' },
        { text: 'Description', value: 'description' },
        { text: 'Category', value: 'category' }
      ],
      items:this.items
    }
  },

}
</script>

<style>
</style>
