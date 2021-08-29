import Vue from 'vue'
import Vuex from 'vuex'

import repayments from './repayments'
import loans from './loans'
import users from './users'
import account from './account'
import app from './app'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account,
    loans,
    repayments,
    users,
    app
  }
})
