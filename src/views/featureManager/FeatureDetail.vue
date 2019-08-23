<template>
  <div>
    <v-row>
      <v-col v-for="mod in availableModules" cols="12" sm="4" md="4">
        <v-checkbox
          v-model="mod.selected"
          :label="mod.name"
        ></v-checkbox>
      </v-col>
      <v-col>
        <v-card>
          <v-list color="indigo">
            <v-subheader class="white--text">Initial modules :</v-subheader>
            <v-list-item v-for="sm in checkedModules">
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
import store from '@/store/store'
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      availableModules : []
    }
  },

  props: {
    allModules: {
      type: Array
    },
    selectedModules: Array
  },
  methods: {
    checkedModules : function() {
        return this.availableModules.filter((e) => e.selected).map((e) => e.id);
    },
    updateCheckboxes() {
      console.log(this.allModules, this.checkedModules())
        const selectedModules = this.feature.selectedModules
         this.availableModules = this.allModules.map(function(el) {
          el.selected = selectedModules.includes(el.name) //dodaje se novo svojstvo na osnovu kog ce checkbox biti selektovan. 
          return el;
      })
    }
  },
  beforeMount(){
    this.updateCheckboxes()
  },
  mounted() {
    //console.log(this.allModules, this.selectedModules, this.checkedModules)
    if (this.feature.selectedCompanyGuid) {

      this.updateCheckboxes()
    }
    
  },
  //Preko emit ugradjene funkcije
  updated() {
    this.$emit('updateModules', this.checkedModules())
  },

  computed: {
    ...mapState({ feature: 'feature' }),

  }
}
</script>