import { AuthServices as Services } from '../services'
import router from '../router'

const user = JSON.parse(localStorage.getItem('user'))

export default {
  namespaced: true,
  state: {
    user: user || null,
    status: user ? { loggedIn: true } : {},
    loading: false
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading
    },
    loginSuccess(state, user) {
      state.status = { loggedIn: true }
      state.user = user
    },
    loginFailure(state) {
      state.status = {}
      state.user = null
    },
    logout(state) {
      state.status = {}
      state.user = null
    },
    // registerRequest(state) {
    //   state.status = { registering: true }
    // },
    registerSuccess(state) {
      state.status = {}
    },
    registerFailure(state) {
      state.status = {}
    }
  },
  actions: {
    login({ dispatch, commit }, { email, pwd }) {
      commit('setLoading', true)

      Services.login(email, pwd).then(
        user => {
          commit('loginSuccess', user)
          // router.push('/')

          router.replace({ path: `/account/${user.id}` })
        },
        error => {
          commit('loginFailure', error)
          dispatch('app/error', error, { root: true })
        }
      )
    },
    logout({ commit }) {
      Services.logout()
      commit('logout')
      commit('setLoading', false)
      router.replace('/login')
    },
    register({ dispatch, commit }, user) {
      commit('setLoading', true)

      console.log()
      Services.register(user).then(
        () => {
          router.push('/')
          setTimeout(() => {
            // display success message after route change completes
            dispatch('app/success', 'Registration successful', { root: true })
          })
        },
        error => {
          commit('registerFailure', error)
          dispatch('app/error', error, { root: true })
        }
      )
    }
  }
}
