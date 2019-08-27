<template>
  <div>
    <v-row>
      <v-col v-for="mod in renderModules" cols="12" sm="4" md="4">
        <v-checkbox v-model="mod.selected" :label="mod.name" @change="updateModules"></v-checkbox>
      </v-col>
      <v-col>
        <v-card>
          <v-list color="indigo">
            <v-subheader class="white--text">Initial modules :</v-subheader>
            <v-list-item v-for="sm in availableModules">
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
      availableModules: [],
    }
  },
  props: {
    renderModules: {
      type: Array
    },

  },
  methods: {
    checkedModules: function() {
      return this.renderModules.filter(e => e.selected).map(e => e.id)
    },
    updateModules:function(){
      store.dispatch('feature/selectedModules',this.checkedModules())
      this.$emit('updateModules', this.checkedModules())

    }
  },
  computed: {
    ...mapState({ feature: 'feature' })

  },
  updated(){

  },
  beforeUpdate() {
    //this.initialModuleIsSelected()
  },

}
</script>