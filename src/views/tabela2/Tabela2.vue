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
        <tr v-for="item in items" :key="item.name">
          <!-- <tr> -->
          <td>{{item.title}}</td>
          <td>{{item.location}}</td>
          <td>{{item.description}}</td>
          <td>{{item.category}}</td>
          <td>
            <v-btn color="primary" @click="clickEdit">Edit {{item.id}}</v-btn>
          </td>
          <td>
            <v-btn color="error" @click="clickDelete">Delete</v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </BaseLayer>
</template>

<script>
import EventService from '@/services/EventService.js'
import { mapState, mapActions } from 'vuex'

export default {
  created() {
    this.fetchData()
    console.log('fetchovani podaci')
  },
  methods: mapActions('tabela', ['fetchData']),
            clickEdit(){
              console.log(`kliknuto edit `)
            },
            clickDelete(){
              console.log(`kliknuto delete `)
            },
  computed: {
    ...mapState({ user: 'user', tabela: 'tabela', events: 'event' })
  },
  mounted() {
    console.log('mounted podaci')
    console.log(this.tabela.stavke)
    this.items = this.tabela.stavke
    console.log(this.items)
  },
  beforeUpdate(){

  },
  data() {
    return {
      items: [],
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Location', value: 'location' },
        { text: 'Description', value: 'description' },
        { text: 'Category', value: 'category' }
      ]
    }
  },

}
</script>

<style>
</style>
