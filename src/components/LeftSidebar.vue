<template>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item @click>
          <v-list-item-content>
            <v-list-item-title>Pocetna</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click>
          <v-list-item-content>
              <router-link :to="{ name: 'tabela' }">Tabela</router-link>
            <v-list-item-title>Projekat 1</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    drawer: null
  }),

}
</script>

<style>

</style>
