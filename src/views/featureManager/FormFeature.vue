<template>
  <div>
    <h3>Form</h3>
    <BaseInput label="Title" v-model="event.title" type="text" placeholder="Title" class="field"/>
  </div>
</template>

<script>
export default {
  data(){
    return {
      event:{
        title:""
      }
    }
  }
    
}
</script>

<style>
</style>
