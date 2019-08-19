<template>
  <div>
    <!-- Check klasika -->
    <!-- <div v-for="mod in moduli">
      <label :for="mod.name">
        <input type="checkbox" :value="mod.name" v-model="selectedModules" />
        {{mod.name}}
      </label>
    </div> -->
    <v-row v-for="mod in moduli">
      <v-col cols="12" sm="4" md="4">
        <v-checkbox
          v-model="selectedModules"
          :label="mod.name"
          color="indigo"
          :value="mod.id"
          hide-details
        ></v-checkbox>
      </v-col>
    </v-row>
      <!-- <button type="button" @click="cbFn(selectedModules)">Handler</button> -->
  </div>

</template>
<script>
export default {
  data() {
    return {
      selectedModules: []
    }
  },
  props: {
    moduli: {
      type: Array
    },
    //Preko callBack funkcije
    cbFn:Function
  },
  methods: {
  },
  //Preko emit ugradjene funkcije
  updated() {
    this.$emit('updateModules', this.selectedModules)
  }
}
</script>