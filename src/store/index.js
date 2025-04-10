import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: 'light',
    toast: {
      show: false,
      message: '',
      type: 'success'
    }
  },
  mutations: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', state.theme)
    },
    showToast(state, { message, type = 'success' }) {
      state.toast = { show: true, message, type }
    },
    hideToast(state) {
      state.toast.show = false
    }
  },
  actions: {
    initTheme({ commit }) {
      const savedTheme = localStorage.getItem('theme') || 'light'
      commit('toggleTheme', savedTheme)
    }
  }
})