<template>
  <v-app id="inspire">
    <div>
      <h3>Feature manager</h3>
      <form>
        <v-flex xs12 sm6 d-flex data-app>
          <!-- <select id="company" class="form-control" v-model="selectedCompany" @change="setSelected">
          <option v-for="company in companies" :key="company.COMPANY_ID">{{ company.COMPANY_NAME }}</option>
          </select>-->
          <v-select
            :items="feature.companies.SiteCustomersList"
            name="company"
            item-text="CompanyName"
            item-value="CompanyGuid"
            filled
            label="Select Company"
            v-model="selectedCompany"
            @change="setSelectedCompany"
          ></v-select>
        </v-flex>
      </form>
      <div>
        <div v-if="selectedCompany">
          <!-- Preko Vuetifya -->
          <div>
            <v-radio-group v-model="radios" :mandatory="false">
              <v-radio label="Portal" value="portal"></v-radio>
              <v-radio label="User group" value="group"></v-radio>
            </v-radio-group>
          </div>
          <hr />

        <v-row>
          <v-col>
            <FeatureDetail
              :moduli="feature.modules"
              @updateModules="selectedModules=$event"
              :cbFn="cbHandler"
            ></FeatureDetail>
          </v-col>
          <v-col>
            <v-card color="indigo">
              <v-list>
                <v-subheader>Selected modules :</v-subheader>
                <v-list-item v-for="sm in selectedModules">
                  <v-list-item-content>
                    <v-list-item-title v-text="sm"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>

        <div>
          <!-- SUBMIT BUTTON -->
          <v-row :align="alignment">
            <v-btn color="error" @click.prevent="submitted" >Edit</v-btn>
          </v-row>

          <!-- Prikaz rezultata -->
          <!-- <v-card v-if="isSubmited">
            <v-card-text>
              <v-card-title>Podaci centralnog statea</v-card-title>
              <p>Selected company : {{feature.selectedCompany}}</p>
              <div>
                Odabrani check boxevi su :
                <ul>
                  <li v-for="check in feature.selectedModules">{{check}}</li>
                </ul>
              </div>
            </v-card-text>
          </v-card> -->
        </div>
        </div>
      </div>
    </div>
  </v-app>
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
      companies: null,
      modules: [],
      selectedCompany: null,
      radios: 'portal',
      checkBox: [],
      isSubmited: false,
      selectedModules: [],
      alignment: 'center',
    }
  },
  components: {
    FeatureDetail
  },

  //Pozivanje actionCreatora kroz komponentni router
  beforeRouteEnter(routeTo, routeFrom, next) {
    NProgress.start()
    //Ne moze da koristi this
    //Inicijalno ucitava sve kompanije i module
    store
      .dispatch('feature/fetchData')
      .then(store.dispatch('feature/fetchModules'))
      .then(response => {
        NProgress.done() // When the action is done complete progress bar
        next() // Only once this is called does the navigation continue
      })
  },
  computed: {
    ...mapState({ feature: 'feature' })
  },
  created() {
    this.companies = this.feature.companies
    //console.log(this.companies)
    this.modules = this.feature.modules
  },
  methods: {
    setSelectedCompany() {
      store.dispatch('feature/selectedCompany', this.selectedCompany)
    },
    //callBack funkcija za event
    cbHandler(modulesData) {
      console.log(modulesData)
      this.selectedModules = modulesData
    },
    makeObject() {
      return {
        subscribedEntityId: this.selectedCompany,
        moduleIds: this.selectedModules
      }
    },
    submitted() {
      this.isSubmited = true
      store.dispatch('feature/selectedModules', this.selectedModules)
      var objekat = this.makeObject()
      //console.log(objekat, this.selectedModules)
      store.dispatch('feature/submitForm', objekat)
    }
  }
}
</script>

<style>
</style>
