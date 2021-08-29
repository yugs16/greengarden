<template>
  <v-col align-self="center" cols="12" xs="12" sm="8" md="6" lg="6" xl="6">
    <v-sheet class="sheet" color="white" elevation="1">
      <v-row justify="center" class="text-h5 ma-2">
        Welcome !!
      </v-row>
      <template>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            :counter="15"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="pwd"
            :rules="passwordRules"
            label="Password *"
            required
          ></v-text-field>

          <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
            hide-details
          ></v-checkbox>

          <v-row justify="center" class="ma-3">
            Already a user?
            <a href="/login" class="subheading mx-1" target="_self">
              Login Here
            </a>
          </v-row>

          <v-row justify="center" class="ma-2">
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="handleSubmit"
            >
              Submit
            </v-btn>

            <v-btn color="error" class="mr-3" @click="reset">
              Reset
            </v-btn>
          </v-row>
        </v-form>
      </template>
    </v-sheet>
  </v-col>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 15) || 'Name must be less than 105characters'
      ],
      email: '',
      pwd: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => (v && v.length >= 5) || 'Password length should be greator than 5'
      ],
      checkbox: false
    }
  },
  computed: {
    ...mapState('account', ['status'])
  },
  // created() {
  //   // reset login status
  //   this.logout()
  // },
  methods: {
    ...mapActions('account', ['register']),
    handleSubmit() {
      const result = this.validate()
      console.log(result)
      this.submitted = true
      const { name, pwd, email } = this
      if (email) {
        this.register({ name, pwd, email })
      }
    },
    validate() {
      return this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    }
    // resetValidation() {
    //   this.$refs.form.resetValidation()
    // }
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
.v-input--checkbox {
  margin: 0;
}
</style>
