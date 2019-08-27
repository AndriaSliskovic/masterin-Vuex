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
                filled
                return-object
                label="Select Company"
                v-model="selectedCompany"
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
        <div v-if="selectedCompany">
          <!-- Radio buttons -->
          <div>
            <v-radio-group v-model="radios" :mandatory="false">
              <v-radio label="Portal" value="portal" @change="portalIsSelected"></v-radio>
              <v-radio label="User group" value="group" @change="userGroupIsSelected"></v-radio>
            </v-radio-group>
          </div>
          <hr />

          <v-row>
            <v-col>
              <!-- Ako je selektovan poratal -->
              <div v-if="radios==='portal'">
                <FeatureDetail
                  :renderModules="renderModules"
                  @updateModules="subscribedFeatureNames=$event"
                ></FeatureDetail>
              </div>
              <!-- Ako je selektovana grupa -->
              <div v-if="radios==='group'">
                <h3>{{subscribedEntityId}}</h3>
                <form>
                  <v-flex xs12 sm6 d-flex data-app>
                    <v-select
                      :items="feature.groups"
                      name="group"
                      item-text="name"
                      item-value="guid"
                      filled
                      label="Select Group"
                      v-model="selectedGroupGuid"
                      @change="setSelectedGroup"
                    ></v-select>
                  </v-flex>
                  <FeatureDetail
                    :renderModules="renderModules"
                    @updateModules="subscribedFeatureNames=$event"
                  ></FeatureDetail>
                </form>
              </div>
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
      subscribedFeatureNames: [],
      renderModules: [],
      selectedCompany: '',
      userGrops: null,
      selectedGroupGuid: null,
      radios: null,
      isSubmited: false
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
    subscribedEntityId: function() {
      return this.selectedCompany.CompanyGuid
    },
    portalId: function() {
      return this.selectedCompany.CompanyId
    }
  },
  created() {
    this.companies = this.feature.companies
  },

  updated() {
    this.subscribedFeatureNames = this.feature.selectedModules
  },
  methods: {
    userGroupIsSelected() {
      store.dispatch('feature/getCompanyGroups', this.selectedCompany.CompanyId)
      store.dispatch('feature/cleanModules')
      this.initialModuleIsSelected()

    },
    portalIsSelected() {
      store.dispatch('feature/cleanModules')
      store
        .dispatch(
          'feature/getSelectedModules',
          this.selectedCompany.CompanyGuid
        )
        .then(() => {
          this.initialModuleIsSelected()
 
        })
    },
    setSelectedCompany() {
      //store.dispatch('feature/cleanModules')
      this.radios = null
      store.dispatch(
        'feature/selectedCompanyGuid',
        this.selectedCompany.CompanyGuid
      )
    },
    setSelectedGroup() {
      store
        .dispatch('feature/getSelectedModules', this.selectedGroupGuid)
        .then(() => {
          this.initialModuleIsSelected()

        })
    },
    initialModuleIsSelected() {

      const initialModules = this.feature.initialModules
      const selModules = this.feature.selectedModules
      if (selModules) {
              this.renderModules = initialModules.map(function(el) {
        el.selected = selModules.includes(el.name) //dodaje se novo svojstvo na osnovu kog ce checkbox biti selektovan.
        return el
      })
      }else{
        //Koristi se da ponisti checkboxeve
        const selModules=[]
        this.renderModules = initialModules.map(function(el) {
        el.selected = selModules.includes(el.name) //dodaje se novo svojstvo na osnovu kog ce checkbox biti selektovan.
        return el
      })
      }

    },

    makeObject() {
      return {
        subscribedEntityId: this.subscribedEntityId,
        moduleIds: this.subscribedFeatureNames
      }
    },
    submitted() {
      this.isSubmited = true
      store.dispatch('feature/selectedModules', this.subscribedFeatureNames)
      store.dispatch('feature/submitForm', this.makeObject())
    }
  }
}
</script>

<style>
</style>
