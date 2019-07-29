<template>
  <div>
    <h4>Tabela</h4>
    <v-data-table :headers="headers" class="elevation-1">
      <tbody>
        
      </tbody>
    </v-data-table>
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'

export default {
      created() {
    EventService.getEvents()
      .then(response => {
        this.items = response.data
        console.log(response.data)
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  },
  data() {
      return {
        items:[],
        headers:[
          {text:'Title',value:'title'},
          {text:'Location',value:'location'},
          {text:'Description',value:'description'},
          {text:'Category',value:'category'},        
        ],
        items:this.items
      }
    },
    methods:{
      renderButton(){
        return `<button>Dugme</button>`
      }
    }

}
</script>

<style>
</style>
