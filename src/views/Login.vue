<template>
  <v-container>
    <v-app-bar color="primary" dark>
      <v-toolbar-title>Login stranica</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text rounded>Home</v-btn>
      <v-btn text rounded="">Login</v-btn>
    </v-app-bar>
    <!-- Login modul -->
    <v-content>
      <v-layout pa-6 mb-2 justify-center>
        <v-card>
          <v-card-title class="pb-0">
            <h3>Login page</h3>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-card-text>
            <v-form>
              <v-text-field label="Username" prepend-icon="account_circle" />
              <v-text-field
                label="Password"
                :type="showPassword ?'text':'password'"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword=!showPassword"
              />
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn color="success">Register</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="info">Login</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-content>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false
    }
  }
}
</script>

<style>
</style>
