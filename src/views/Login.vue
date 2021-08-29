<template>
  <v-col align-self="center" cols="12" xs="12" sm="8" md="6" lg="6" xl="6">
    <v-sheet class="sheet" color="white" elevation="1">
      <v-row justify="center" class="text-h5 ma-2">
        Welcome Back!!
      </v-row>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail *"
        ></v-text-field>

        <v-text-field
          v-model="pwd"
          :rules="passwordRules"
          label="Password *"
          required
        ></v-text-field>

        <v-row justify="center" class="ma-3">
          Do not have an account yet?
          <a href="/register" class="subheading mx-1" target="_self">
            Register Here
          </a>
        </v-row>

        <div class="justify-center flex row mt-4 pb-2">
          <v-btn
            :disabled="loading || !valid"
            :loading="loading"
            color="success"
            class="mr-4"
            @click="handleSubmit"
          >
            Login
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset">
            Reset
          </v-btn>
        </div>
      </v-form>
    </v-sheet>
  </v-col>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      valid: true,
      submitted: false,
      email: '',
      pwd: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => (v && v.length >= 5) || 'Password length should be greator than 5'
      ],
      select: null,
      checkbox: false
    }
  },
  computed: {
    ...mapState('account', ['status', 'loading'])
  },
  methods: {
    ...mapActions('account', ['login', 'logout']),
    handleSubmit() {
      this.validate()
      this.submitted = true
      const { email, pwd } = this
      if (email && pwd) {
        this.login({ email, pwd })
      }
    },
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    }
  }
}
</script>
<style scoped>
.sheet {
  padding: 24px;
  width: 100%;
  height: auto;
}
a {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
