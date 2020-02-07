<template>
    <ul>
        <li>
            <router-link
            :to="{
                name: 'home'
            }">
                Home
            </router-link>
        </li>
        <template v-if="authenticated">
            <li>
                {{ user.name }}
            </li>
            <li>
                <router-link
                        :to="{
            name: 'dashboard'
        }">
                    Dashboard
                </router-link>
            </li>
            <li>
                <a href="#" @click.prevent="logout">Sign Out</a>
            </li>
        </template>
        <template v-else>
            <li>
                <router-link
                        :to="{
            name: 'signin'
        }">
                    Sign In
                </router-link>
            </li>
        </template>
    </ul>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                authenticated: 'auth/authenticated',
                user: 'auth/user'
            })
        },
        methods: {
            ...mapActions({
                logoutAction: 'auth/logout'
            }),
            logout () {
                this.logoutAction().then(() => {
                    this.$router.replace({
                        name: 'home'
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>