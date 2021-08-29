<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />
    </div>

    <v-toolbar-title>WebName</v-toolbar-title>
    <v-spacer></v-spacer>

    <div v-if="user.id" class="name">
      <span class="mr-2 hwading1">{{ user.name }}</span>
      <v-btn text @click="$emit('logout')">
        Logout
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'NavBar',

  data: () => ({
    //
    snackbar: false
  }),
  computed: {
    ...mapState({
      user: state => state.account.user || {}
    })
  },
  watch: {},
  methods: {}
}
</script>
<style scoped>
.name {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-end;
}
</style>
