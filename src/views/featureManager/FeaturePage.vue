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
                v-model="selectedCompanyGuid"
                @change="setSelectedCompany"
              ></v-select>
            </v-flex>
          </form>
        </v-col>
        <v-col>
          <v-card color="indigo">
            <v-subheader dark>Selected options :</v-subheader>
            <v-card-title>{{selectedCompany.CompanyName}}</v-card-title>
          </v-card>
        </v-col>
      </v-row>

      <div>
        <div v-if="selectedCompanyGuid">
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
                  :allModules="feature.initialModules"
                  :selectedModules="feature.selectedModules"
                  @updateModules="selectedModules=$event"

                ></FeatureDetail>
              </div>
              <!-- Ako je selektovana grupa -->
              <div v-if="radios==='group'">
                <h3>{{selectedCompanyGuid}}</h3>
                <form>
                  <v-flex xs12 sm6 d-flex data-app>
                    <v-select
                      :items="feature.companies.SiteCustomersList"
                      name="group"
                      item-text="CompanyName"
                      item-value="CompanyGuid"
                      filled
                      label="Select Group"
                      v-model="selectedGroupGuid"
                      @change="setSelectedGroup"
                    ></v-select>
                  </v-flex>
                  <FeatureDetail
                    :allModules="feature.initialModules"
                    :selectedModules="feature.selectedModules"
                    @updateModules="selectedModules=$event"

                  ></FeatureDetail>
                </form>
              </div>
            </v-col>
            <!-- <v-col>
              <v-card>
                <v-list color="indigo">
                  <v-subheader class="white--text">Selected modules :</v-subheader>
                  <v-list-item v-for="sm in feature.selectedModules">
                    <v-list-item-content>
                      <v-list-item-title v-text="sm" class="white--text"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col> -->
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
      selectedCompanyGuid: null,
      selectedCompany:'',
      selectedGroupGuid: null,
      radios: null,
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
      .dispatch('feature/fetchCompanies')
      .then(store.dispatch('feature/fetchInitialModules'))
      .then(response => {
        NProgress.done() // When the action is done complete progress bar
        next() // Only once this is called does the navigation continue
      })
  },
  computed: {
    ...mapState({ feature: 'feature' }),
    getCompany(){
      if (this.selectedCompanyGuid) {
      // console.log("imam kompanije",this.companies.SiteCustomersList)
      const comp=this.companies.SiteCustomersList
      const company=comp.filter(function(c){
        return c.CompanyGuid==="74451a04-888f-4fe4-b1ac-c268930b97d6"
      })
      store.dispatch('feature/selectedCompanyObject',company[0])
      }
    },
    companyName(){
      if (this.feature.selectedCompany) {
       this.selectedCompany=this.feature.selectedCompany
      }
    }
  },
  created() {
    this.companies = this.feature.companies

  },

  updated() {
    // console.log(this.feature.selectedModules, this.selectedGroup, this.radios)
    //this.modules = this.feature.modules
    this.selectedModules = this.feature.selectedModules
  },
  methods: {
    setSelectedCompany() {

      store.dispatch('feature/cleanModules')
      this.radios=null
      store
        .dispatch('feature/selectedCompanyGuid', this.selectedCompanyGuid)
        .then(
          store.dispatch('feature/getSelectedModules', this.selectedCompanyGuid)
        )
        .then(this.getCompany)
      //.then(this.selectedModules=this.feature.selectedModules)
    },
    setSelectedGroup() {
      console.log(this.selectedGroupGuid)
      store.dispatch('feature/cleanModules')
      store.dispatch('feature/selectedGroupGuid', this.selectedGroupGuid)
      .then(store.dispatch('feature/getSelectedModules', this.selectedGroupGuid))
      
    },
    makeObject() {
      var guid = ''
      if (this.radios) {
        console.log('imam radio')
        if (this.radios === 'portal') {
          this.guid = this.selectedCompanyGuid
        } else {
          this.guid = this.selectedGroupGuid
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
