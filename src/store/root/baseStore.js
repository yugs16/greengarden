// const user = JSON.parse(localStorage.getItem('user'))

export default {
  namespaced: true,
  state: {
    loading: false,
    params: null,
    route: null
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading
    }
  },
  actions: {}
}
