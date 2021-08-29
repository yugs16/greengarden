import { ApiServices as Services } from '../services'
import BaseStore from './baseStore'

// const user = JSON.parse(localStorage.getItem('user'))

const extendFrom = BaseStore

export default {
  namespaced: true,
  state: {
    ...extendFrom.state,
    item: null,
    endPoint: '/'
  },
  mutations: {
    ...extendFrom.mutations,
    setItem(state, item) {
      state.items = item
    }
  },
  actions: {
    ...extendFrom.actions,
    fetch({ dispatch, commit }, fetchFor, filters) {
      commit('setLoading', true)

      Services.fetchCollection(fetchFor, filters).then(
        record => {
          commit('setLoading', false)
          commit('setItem', record)
        },
        error => {
          commit('setLoading', false)
          dispatch('app/error', error, { root: true })
        }
      )
    }
  }
}
