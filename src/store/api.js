import store from '@/store'
import axios from 'axios'

export default {
    namespaced: true,

    getters: {
        authenticated (state) {
            return !!(state.token && state.user)
        },
        user (state) {
            return state.user
        }
    },

    mutations: {
        SET_USER (state, user) {
            state.user = user
        }
    },
    actions: {
        async attemptChange ({ commit }, user) {
            try {
                commit('SET_USER', user)
            } catch (e) {
                //
            }
        },

        async editProfile ({ dispatch }, changingUser) {
            if (!changingUser.id
                || !store.getters['auth/authenticated']
                || store.getters['auth/user']['id'] != changingUser.id) {
                throw 'Unauthorized action.'
            }

            if ('' === changingUser.name) {
                return
            }

            let data = { name: changingUser.name }
            let response = await axios.put('profiles/' + changingUser.id, data)

            return dispatch('attemptChange', response.data)
        }
    }
}
