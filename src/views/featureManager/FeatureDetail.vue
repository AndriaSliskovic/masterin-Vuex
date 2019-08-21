<template>
  <div>
    <v-row>
      <v-col v-for="mod in allModules" cols="12" sm="4" md="4">
        <v-checkbox
          v-model="checkedModules"
          :label="mod.name"
          color="indigo"
          :value="mod.id"
          hide-details
        ></v-checkbox>
      </v-col>
      <v-col>
        <v-card>
          <v-list color="indigo">
            <v-subheader class="white--text">Initial modules :</v-subheader>
            <v-list-item v-for="sm in selectedModules">
              <v-list-item-content>
                <v-list-item-title v-text="sm" class="white--text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      checkedModules: []
    }
  },

  props: {
    allModules: {
      type: Array
    },
    selectedModules: Array
  },
  methods: {},
  beforeMount(){
    this.updateCheckboxes
  },
  mounted() {
    console.log(this.allModules, this.selectedModules, this.checkedModules)
    //this.updateCheckboxes
  },
  //Preko emit ugradjene funkcije
  updated() {
    console.log('updejtovano', this.checkedModules)
    this.$emit('updateModules', this.checkedModules)
  },

  computed: {
    ...mapState({ feature: 'feature' }),
    updateCheckboxes() {
      console.log(this.allModules, this.checkedModules)
      var i
      for (i of this.allModules) {
        console.log(i.name)
        var n
        for (n of this.feature.selectedModules) {
          if (i.name === n) {
            console.log('imam if', i)
            this.checkedModules.push(i.id)
          }
        }
      }
    }
  }
}
</script>