<template>
  <v-app id="inspire">
    <div>
      <NotificationContainer />
      <h3>Feature manager</h3>
      <v-col>
        <form>
          <v-flex xs12 sm6 d-flex data-app>
            <v-select
              :items="feature.companies.SiteCustomersList"
              name="company"
              item-text="CompanyName"
              filled
              return-object
              label="Company"
              hint="Select company"
              persistent-hint
              v-model="selectedCompany"
              @change="setSelectedCompany"
            ></v-select>
          </v-flex>
        </form>
      </v-col>
      <v-col>
        <!-- Select options -->
        <v-flex xs12 sm6 d-flex data-app>
          <v-select
            :items="selectOption"
            name="group"
            item-text="name"
            item-value="key"
            filled
            label="Settings"
            hint="Select portal or user group"
            persistent-hint
            v-model="options"
            @change="setSelectedSettings"
            :disabled="disabledSelectSettings"
          ></v-select>
        </v-flex>
      </v-col>

      <div>
        <div v-if="selectedCompany">
          <v-col>
            <!-- Ako je selektovan poratal -->
            <div v-if="options==='portal'">
              <FeatureDetail :renderModules="renderModules" @updateModules="featuresIds=$event"></FeatureDetail>
            </div>
            <!-- Ako je selektovana grupa -->
            <div v-if="options==='group'">
              <form>
                <v-flex xs12 sm6 d-flex data-app>
                  <v-select
                    :items="feature.groups"
                    name="group"
                    item-text="name"
                    item-value="guid"
                    filled
                    label="User Groups"
                    hint="Select a user group"
                    persistent-hint
                    v-model="selectedGroupGuid"
                    @change="setSelectedGroup"
                  ></v-select>
                </v-flex>
                <FeatureDetail :renderModules="renderModules" @updateModules="featuresIds=$event"></FeatureDetail>
              </form>
            </div>
          </v-col>

          <!-- SUBMIT BUTTON -->
          <v-row justify="center">
            <v-btn color="error" @click.prevent="submitted" :disabled="disabledButton">Save</v-btn>
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
import NotificationContainer from '../../components/NotificationContainer'

export default {
  data() {
    return {
      companies: null,
      featuresIds: [],
      renderModules: [],
      selectedCompany: null,
      selectedGroupGuid: null,
      options: null,
      isSubmited: false,
      selectOption: [
        {
          key: 'portal',
          name: 'Portal'
        },
        {
          key: 'group',
          name: 'User Group'
        }
      ]
    }
  },
  components: {
    FeatureDetail,
    NotificationContainer
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    NProgress.start()
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
      if (this.options === 'portal') {
        return this.selectedCompany.CompanyGuid
      } else {
        return this.selectedGroupGuid
      }
    },
    portalId: function() {
      return this.selectedCompany.CompanyId
    },
    disabledButton: function() {
      return !this.options || !this.feature.selectedModules
    },
    disabledSelectSettings: function() {
      return !this.selectedCompany
    },
    subscribedFeatureIds: function() {
      const names = this.feature.selectedModules
      const modules = this.feature.initialModules
      return modules
        .filter(x => names.includes(x.name))
        .map(x => {
          return x.id
        }) 
    }
  },
  created() {
    this.companies = this.feature.companies
  },

  updated() {},
  methods: {
    userGroupIsSelected() {
      store.dispatch('feature/getCompanyGroups', this.selectedCompany.CompanyId)
      if (this.selectedGroupGuid) {
        store.dispatch('feature/cleanModules')
        store
          .dispatch('feature/getSelectedModules', this.selectedGroupGuid)
          .then(() => {
            this.initialModuleIsSelected()
          })
      } else {
        store.dispatch('feature/cleanModules').then(() => {
          this.initialModuleIsSelected()
        })
      }
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
      this.options = null
      //Clearing user group guid
      this.selectedGroupGuid = null
      //Clearing modules
      store.dispatch('feature/cleanModules')
      store.dispatch(
        'feature/selectedCompanyGuid',
        this.selectedCompany.CompanyGuid
      )
    },
    setSelectedSettings() {
      switch (this.options) {
        case 'portal':
          this.portalIsSelected()
          break
        case 'group':
          this.userGroupIsSelected()
          break
        default:
          this.options = null
          break
      }
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
      } else {
        const selModules = []
        this.renderModules = initialModules.map(function(el) {
          el.selected = selModules.includes(el.name)
          return el
        })
      }
    },

    makeObject() {
      return {
        subscribedEntityId: this.subscribedEntityId,
        moduleIds: this.featuresIds
      }
    },
    submitted() {
      this.isSubmited = true
      store.dispatch('feature/selectedModules', this.featuresIds)
      store.dispatch('feature/submitForm', this.makeObject())
      //this.reloadPage()
    },
    reloadPage() {
      window.location.reload()
    }
  }
}
</script>

<style>
</style>
