<template>
  <div >
    <h3>Feature manager</h3>
    <form>
      <v-flex xs12 sm6 d-flex data-app>
        <!-- <select id="company" class="form-control" v-model="selectedCompany" @change="setSelected">
          <option v-for="company in companies" :key="company.COMPANY_ID">{{ company.COMPANY_NAME }}</option>
        </select> -->
        <v-select
          :items="companies"
          name="company"
          item-text="COMPANY_NAME"
          filled
          label="Select Company"
          v-model="selectedCompany"
          @change="setSelected"
        ></v-select>
      </v-flex>
    </form>
    <div>
      <div v-if="selectedCompany">
        <p>Selektovana kompanije je : {{selectedCompany}}</p>
        <p>State vrednost je :{{feature.selectedCompany}}</p>
         <v-radio-group v-model="radios" :mandatory="false">
      <v-radio label="Radio 1" value="radio-1"></v-radio>
      <v-radio label="Radio 2" value="radio-2"></v-radio>
    </v-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
import NProgress from 'nprogress'
import EventService from '../../services/EventService'
import { mapState, mapActions } from 'vuex'
import store from '@/store/store'
import FeatureDetail from './FeatureDetail'
export default {
  data() {
    return {
      companies: [],
      selectedCompany: null,
      radios: 'radio-1',
    }
  },
  components: {
    FeatureDetail
  },

  //Pozivanje actionCreatora kroz komponentni router
  beforeRouteEnter(routeTo, routeFrom, next) {
    NProgress.start()
    //Ne moze da koristi this
    store.dispatch('feature/fetchData').then(response => {
      NProgress.done() // When the action is done complete progress bar
      next() // Only once this is called does the navigation continue
    })
  },
  computed: {
    ...mapState({ feature: 'feature' })
  },
  mounted() {
    this.companies = this.feature.companies
    //   console.log(`mounted fetchovani podaci ${this.feature.companies[0].COMPANY_NAME}`)
    //console.log(this.companies)
  },
  methods: {
    setSelected() {
      store.dispatch('feature/selectedCompany', this.selectedCompany)
    }
  }
}
</script>

<style>
</style>
