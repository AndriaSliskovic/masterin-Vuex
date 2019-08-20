<template>
  <v-app id="inspire">
    <div>
      <h3>Feature manager</h3>
      <v-row>
        <v-col>
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
        </v-col>
        <v-col>
          <v-card color="indigo">
             <v-subheader dark>Selected company :</v-subheader>
            <v-card-title>{{selectedCompany}}</v-card-title>
          </v-card>
        </v-col>
      </v-row>

      <div>
        <div v-if="selectedCompany">
          <!-- Radio buttons -->
          <div>
            <v-radio-group v-model="radios" :mandatory="false">
              <v-radio label="Portal" value="portal"></v-radio>
              <v-radio label="User group" value="group"></v-radio>
            </v-radio-group>
          </div>
          <hr />

          <v-row>
            <v-col>
              <!-- Ako je selektovan poratal -->
              <div v-if="radios==='portal'">
                <FeatureDetail
                  :moduli="feature.modules"
                  @updateModules="selectedModules=$event"
                  :cbFn="cbHandler"
                ></FeatureDetail>
              </div>
              <!-- Ako je selektovana grupa -->
              <div v-if="radios==='group'">
                <h3>{{selectedCompany}}</h3>
                <form>
                  <v-flex xs12 sm6 d-flex data-app>
                    <v-select
                      :items="feature.companies.SiteCustomersList"
                      name="group"
                      item-text="CompanyName"
                      item-value="CompanyGuid"
                      filled
                      label="Select Group"
                      v-model="selectedGroup"
                      @change="setSelectedGroup"
                    ></v-select>
                  </v-flex>
                  <FeatureDetail
                    :moduli="feature.modules"
                    @updateModules="selectedModules=$event"
                    :cbFn="cbHandler"
                  ></FeatureDetail>
                </form>
              </div>
            </v-col>
            <v-col>
              <v-card>
                <v-list color="indigo">
                  <v-subheader class="white--text">Selected modules :</v-subheader>
                  <v-list-item v-for="sm in selectedModules">
                    <v-list-item-content>
                      <v-list-item-title v-text="sm" class="white--text"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>


          <!-- SUBMIT BUTTON -->
          <v-row justify="center">
            <v-btn color="error" @click.prevent="submitted">Submit</v-btn>
          </v-row>
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
      selectedGroup: null,
      radios: null,
      checkBox: [],
      isSubmited: false,
      selectedModules: []
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
  beforeUpdate() {
    console.log(this.feature.selectedModules, this.selectedGroup, this.radios)
    this.selectedModules=this.feature.selectedModules
  },
  methods: {
    setSelectedCompany() {
      store.dispatch('feature/selectedCompany', this.selectedCompany)
      store.dispatch('feature/getSelectedModules',this.selectedCompany)
    },
    setSelectedGroup() {
      store.dispatch('feature/selectedGroup', this.selectedGroup)
    },
    //callBack funkcija za event
    cbHandler(modulesData) {
      console.log(modulesData)
      this.selectedModules = modulesData
    },
    makeObject() {
      var guid = ''
      if (this.radios) {
        console.log('imam radio')
        if (this.radios === 'portal') {
          this.guid = this.selectedCompany
        } else {
          this.guid = this.selectedGroup
        }
      } else {
        console.log('nemam radio')
      }
      return {
        subscribedEntityId: this.guid,
        moduleIds: this.selectedModules
      }
    },
    submitted() {
      this.isSubmited = true
      store.dispatch('feature/selectedModules', this.selectedModules)
      // if (this.radios) {
      //   console.log("imam radio button")
      // } else {
      //   //Errror handler
      //   console.log('morate odabrati bar jedan radio button')
      // }
      var objekat = this.makeObject()
      store.dispatch('feature/submitForm', objekat)
    }
  }
}
</script>

<style>
</style>
