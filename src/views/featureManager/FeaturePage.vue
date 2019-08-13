<template>
  <div>
    <h3>Feature manager</h3>
    <form>
      <v-flex xs12 sm6 d-flex data-app>
        <!-- <select id="company" class="form-control" v-model="selectedCompany" @change="setSelected">
          <option v-for="company in companies" :key="company.COMPANY_ID">{{ company.COMPANY_NAME }}</option>
        </select>-->
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
        <!-- RADIO BUTTONS -->
        <!-- Preko Vuetifya -->
        <div>
          <v-radio-group v-model="radios" :mandatory="false">
            <v-radio label="Portal" value="portal"></v-radio>
            <v-radio label="User group" value="group"></v-radio>
          </v-radio-group>
          <p>Radio buttoni su {{radios}}</p>
          <!-- /radio klasika -->
          <v-row>
            <div>
              <label for="portal">
                <input type="radio" id="portal" value="portal" v-model="radios" /> Portal
              </label>
              <label for="female">
                <input type="radio" id="group" value="UserGroup" v-model="radios" /> User group
              </label>
            </div>
          </v-row>
        </div>
        <hr />
        <div>
          <!-- CHECK BOXEVI -->
          <!-- Vuetify -->
          <div>
            <v-row>
              <v-col cols="12" sm="4" md="4">
                <v-checkbox
                  v-model="checkBox"
                  label="Send Mail-red"
                  color="red"
                  value="Mail-red"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="checkBox"
                  label="Send Infomail - blue"
                  value="Mail-blue"
                  hide-details
                ></v-checkbox>
              </v-col>
            </v-row>
          </div>
          <!-- Check klasika -->
          <v-row>
            <div class="form-group">
              <label for="sendmail">
                <input type="checkbox" id="sendmail" value="SendMail" v-model="checkBox" /> Send Mail
              </label>
              <label for="sendInfomail">
                <input type="checkbox" id="sendInfomail" value="SendInfoMail" v-model="checkBox" /> Send Infomail
              </label>
              <div>
                Odabrani check boxevi su :
                <ul>
                  <li v-for="mod in modules">{{mod.description}}</li>
                </ul>
              </div>
            </div>
          </v-row>
          <!-- SUBMIT BUTTON -->
          <div>
            <!-- Klasika -->
            <div>
              <v-btn color="error" @click.prevent="submitted">Submit!</v-btn>
            </div>
            <!-- Vuetify -->
            <div></div>
          </div>
          <!-- Prikaz rezultata -->

          <v-card v-if="isSubmited">
            <v-card-text>
              <v-card-title>Podaci centralnog statea</v-card-title>
              <p>Selected company : {{feature.selectedCompany}}</p>
              <p>Radio : {{feature.dataObject.radio}}</p>
              <div>
                Odabrani check boxevi su :
                <ul>
                  <li v-for="check in feature.dataObject.checkBoxes">{{check}}</li>
                </ul>
              </div>
            </v-card-text>
          </v-card>
        </div>
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
      modules:[],
      selectedCompany: null,
      radios: 'portal',
      checkBox: [],
      isSubmited: false,

    }
  },
  components: {
    FeatureDetail
  },

  //Pozivanje actionCreatora kroz komponentni router
  beforeRouteEnter(routeTo, routeFrom, next) {
    NProgress.start()
    //Ne moze da koristi this
    store.dispatch('feature/fetchData')
    .then(store.dispatch('feature/fetchModules'))
    .then(response => {
      NProgress.done() // When the action is done complete progress bar
      next() // Only once this is called does the navigation continue
    })
  },
  computed: {
    ...mapState({ feature: 'feature' })
  },
  mounted() {
    console.log(this.feature.companies);
    this.companies = this.feature.companies;
    this.modules=this.feature.modules;
    //   console.log(`mounted fetchovani podaci ${this.feature.companies[0].COMPANY_NAME}`)
    console.log(this.companies)
  },
  methods: {
    setSelected() {
      store.dispatch('feature/selectedCompany', this.selectedCompany)
    },
    makeObject(){
      return {
        company:this.selectedCompany,
        radio:this.radios,
        checkBoxes:this.checkBox
      }
    },
    submitted() {
      this.isSubmited = true
      var objekat=this.makeObject();
      console.log(objekat);
      store.dispatch('feature/submitForm', objekat)
    }
  }
}
</script>

<style>
</style>
