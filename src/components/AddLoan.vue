<template>
  <v-sheet class="sheet mb-2 v-toolbar__title" color="white" elevation="4">
    <template>
      <div class="text-h5 mb-2">Apply for Loan</div>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="amount"
          type="number"
          :rules="amountRules"
          label="Amount"
          required
        ></v-text-field>

        <v-text-field
          v-model="numberOfRepayments"
          type="number"
          :rules="numberOfRepaymentsRules"
          label="Number of Repayments"
          required
        ></v-text-field>

        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
        ></v-checkbox>

        <v-row justify="end" class="ma-2">
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
        v => (v && v.length <= 10) || 'Name must be less than 15 characters'
      ],
      amount: null,
      numberOfRepayments: 1,
      numberOfRepaymentsRules: [
        v =>
          (v && v > 0 && v < 24) || 'Number of repaymnets should be in [0, 24]'
      ],
      amountRules: [
        v => (v && v > 0 && v < 1000000) || 'Amount should be in [0, 1000000]'
      ],
      checkbox: false
    }
  },
  computed: {
    ...mapState('account', ['user'])
  },
  methods: {
    ...mapActions('loans', ['update', 'fetch']),
    handleSubmit() {
      const result = this.validate()
      console.log(result)
      if (result) {
        const { amount, name, numberOfRepayments } = this
        this.$emit('input', {
          amount,
          name,
          numberOfRepayments,
          status: 'unpaid'
        })
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
</style>
