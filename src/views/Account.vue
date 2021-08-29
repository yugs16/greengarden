<template>
  <v-col class="mb-2 no-gutters">
    <AddLoan @input="addLoan" />
    <List
      :items="loans.items"
      :loading="loans.loading"
      :headers="loanHeaders"
      @action="payRepayments"
    ></List>
  </v-col>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import List from '../components/List'
import AddLoan from '../components/AddLoan'

export default {
  name: 'Account',
  data() {
    return {
      loanHeaders: [
        {
          text: 'Loan name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Amount', value: 'amount' },
        { text: 'Number of Repayments', value: 'numberOfRepayments' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
    }
  },
  mounted() {
    this.fetchLoans()
  },
  props: {
    msg: String
  },
  components: {
    List,
    AddLoan
  },
  computed: {
    ...mapState({
      user: state => state.account.user,
      loans: state => state.loans || {}
    })
  },
  methods: {
    ...mapActions({
      fetchLoans: 'loans/fetch',
      update: 'loans/update',
      payRepayments: 'loans/payRepayments'
    }),
    addLoan(payload) {
      this.update(payload)
    }
  }
}
</script>
<style scoped></style>
