import axios from 'axios'

export default {
    namespaced: true,
    state: {
        token: null,
        user: null
    },

    getters: {
        authenticated (state) {
            return !!(state.token && state.user)
        },
        user (state) {
            return state.user
        }
    },

    mutations: {
        SET_TOKEN (state, token) {
            state.token = token
        },
        SET_USER (state, user) {
            state.user = user
        }
    },
    actions: {
        async login ({ dispatch }, credentials) {
            let response = await axios.post('auth/login', credentials)
            return dispatch('attemptLogin', response.data.token)
        },

        async attemptLogin ({ commit, state }, token) {
            if (token) {
                commit('SET_TOKEN', token)
            }

            if (!state.token) {
                return
            }

            try {
                let response = await axios.get('dashboard')
                commit('SET_USER', response.data)
            } catch (e) {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
            }
        },

        async register ({ dispatch }, credentials) {
            let response = await axios.post('auth/register', credentials)
            return dispatch('attemptRegister', response.data)
        },

        async attemptRegister ({ commit, state }, data) {
            try {
                if (data.token) {
                    commit('SET_TOKEN', data.token)
                }

                if (!state.token) {
                    return
                }

                commit('SET_USER', data.user)
            } catch (e) {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
            }
        },

        logout ({ commit }) {
            return axios.post('auth/logout').then(() => {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
            })
        }
    }
}
