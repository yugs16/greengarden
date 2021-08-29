import { ApiServices as Services } from '../../services'
import BaseStore from './baseStore'

import genApiUrl from '../../utils/genApiUrl'
// const user = JSON.parse(localStorage.getItem('user'))

const extendFrom = BaseStore

export default {
  namespaced: true,
  state: {
    ...extendFrom.state,
    items: []
  },
  mutations: {
    ...extendFrom.mutations,
    setItems(state, items) {
      state.items = items
    }
  },
  actions: {
    ...extendFrom.actions,
    fetch({ state, dispatch, commit }, filters) {
      commit('setLoading', true)
      const { url } = genApiUrl(state.endPoint)

      Services.fetchCollection(url, filters).then(
        collection => {
          commit('setLoading', false)
          commit('setItems', collection)
        },
        error => {
          commit('setLoading', false)
          dispatch('app/error', error, { root: true })
        }
      )
    },

    update({ state, dispatch, commit }, recordToUpdate) {
      commit('setLoading', true)

      const fnToCall =
        recordToUpdate && recordToUpdate.id ? 'updateRecord' : 'addRecord'

      const { url } = genApiUrl(state.endPoint, recordToUpdate.id)

      Services[fnToCall](url, recordToUpdate).then(
        () => {
          commit('setLoading', false)
          dispatch('app/success', state.successMessage, {
            root: true
          })
          dispatch('fetch', state.endPoint)
        },
        error => {
          commit('setLoading', false)
          dispatch('app/error', error, { root: true })
        }
      )
    }
  }
}
