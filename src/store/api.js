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
        async attempt ({ commit }, user) {
            try {
                commit('SET_USER', user)
            } catch (e) {
                // console.log('error in api.js:32')
            }
        },

        async editProfile ({ dispatch }, changingUser) {
            if (!changingUser.id || !(this.token && this.user)) {
                throw 'Unauthorized action.'
            }

            if (changingUser.name.trim() === this.user.name) {
                return
            }

            let data = { name: changingUser.name }
            let response = await axios.put('profiles/' + changingUser.id, data)
            //
            return dispatch('attempt', response.data)
        }
    }
}
