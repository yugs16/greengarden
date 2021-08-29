import { ApiServices as Services } from '../services'
import Collection from './root/collection'

import genApiUrl from '../utils/genApiUrl'
// const user = JSON.parse(localStorage.getItem('user'))

const extendFrom = Collection

export default {
  namespaced: true,
  state: {
    ...extendFrom.state,
    endPoint: 'loans',
    successMessage: 'Loan applied successfully'
  },
  mutations: { ...extendFrom.mutations },
  actions: {
    ...extendFrom.actions,
    async fetch({ state, dispatch, commit }, filters) {
      commit('setLoading', true)
      const { url } = genApiUrl(state.endPoint)

      try {
        const collection = await Services.fetchCollection(url, filters)
        commit('setLoading', false)
        commit('setItems', collection)
      } catch (error) {
        commit('setLoading', false)
        dispatch('app/error', error, { root: true })
      }
    },

    async payRepayments({ state, dispatch, commit }, filters) {
      commit('setLoading', true)
      const { url } = genApiUrl(state.endPoint)

      try {
        await Services.updateRecord(`${url}/repayments`, filters)
        commit('setLoading', false)

        dispatch('fetch')
        dispatch('app/success', 'Loan repaid successfully', { root: true })
      } catch (error) {
        commit('setLoading', false)
        dispatch('app/error', error, { root: true })
      }
    }
  }
}
