<template>
  <v-app>
    <NavBar @logout="logout" />
    <v-main>
      <v-snackbar
        v-model="snackbar"
        :color="alert.type"
        :timeout="6000"
        transition="slide-y-transition"
      >
        {{ alert.message }}

        <template v-slot:action="{ attrs }">
          <v-btn color="black" text v-bind="attrs" @click="clearAlert">
            Close
          </v-btn>
        </template>
      </v-snackbar>

      <v-container class="grey lighten-5 fluid fill-height">
        <v-row no-gutters align="center" justify="center">
          <!-- <v-card class="pa-2" outlined tile>
              One of three columns
            </v-card> -->

          <router-view />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import NavBar from './layouts/NavBar'

export default {
  name: 'App',
  components: {
    NavBar
  },
  data: () => ({
    //
    snackbar: false
  }),
  computed: {
    ...mapState({
      alert: state => state.app || {}
    })
  },
  watch: {
    $route() {
      // clear alert on location change
      this.clearAlert()
    },
    snackbar(newVal, oldVal) {
      if (!newVal && oldVal === true) this.clearAlert()
    },
    'alert.type'(val) {
      if (val) this.snackbar = true
      else this.snackbar = false
    }
  },
  methods: {
    ...mapActions({
      clearAlert: 'app/clear',
      logout: 'account/logout'
    })
  }
}
</script>
<style scoped>
.sheet {
  padding: 24px;
  width: 100%;
  height: 100%;
}
</style>
