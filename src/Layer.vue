<template>
  <v-app id="inspire">
    <NavBar />
    <router-view :key="$route.fullPath" />
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item @click>
          <v-list-item-content>
            <v-list-item-title>
              <router-link :to="{ name: 'pocetna' }" exact>Pocetna</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click>
          <v-list-item-content>
            <router-link :to="{ name: 'tabela' }" exact>Tabela</router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click>
          <v-list-item-content>
            <router-link :to="{ name: 'tabela2' }" exact>Tabela 2</router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click>
          <v-list-item-content>
            <router-link :to="{ name: 'login' }" exact>Login</router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- <LeftSidebar/> -->

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Workshop</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <!-- Ceo kontent ide ovde -->
    </v-content>
    <v-footer color="indigo" app>
      <v-layout
      justify-center
      wrap
    >
      <span class="white--text">&copy; 2019</span>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import LeftSidebar from './components/LeftSidebar'
import NavBar from './components/NavBar'
export default {
  props: {
    source: String
  },
  components: {
    LeftSidebar,
    NavBar
  },
  data: () => ({
    drawer: null
  })
}
</script>