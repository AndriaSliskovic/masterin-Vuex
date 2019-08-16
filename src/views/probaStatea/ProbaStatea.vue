<template>

    <VCard>
      <v-card-title>{{ime}}</v-card-title>
      <v-card-text>Broj je {{broj}}</v-card-text>
      <input type="number" v-model.number="povecajGaZa" />
      <v-input :messages="['Messages']" append-icon="close" prepend-icon="phone">Default Slot</v-input>
          <div class="my-2">
      <VBtn depressed small color="primary" @click="povecajBroj">Uvecaj broj</VBtn>
    </div>
    </VCard>
</template>

<script>
import { mapState } from 'vuex'
import { VBtn, VCard } from 'vuetify/lib'

export default {
  components: {
    VBtn,
    VCard
  },
  data() {
    return {
      povecajGaZa: 5
    }
  },
  methods: {
    povecajBroj() {
      this.$store.commit('POVECAJ_BROJ', this.povecajGaZa)
    }
  },
  created(){
    console.log(this.ime)
    console.log(`pocetni broj je ${this.broj}`)
  },
  beforeUpdate(){
    console.log(`pre updatea broj je ${this.broj}`)
  },
  updated(){
    console.log(`updejtovani broj je ${this.broj}`)
  },
  computed: mapState({
    ime: state => state.proba.naziv.name,
    broj: state => state.proba.broj.br
  })
}
</script>

<style scoped>
.v-card__title {
  color: blue
}
#input-usage .v-input__prepend-outer,
#input-usage .v-input__append-outer,
#input-usage .v-input__slot,
#input-usage .v-messages {
  border: 1px dashed rgba(0, 0, 0, 0.4);
}
</style>
