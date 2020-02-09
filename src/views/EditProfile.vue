<template>
    <div>
        <form method="post" @submit.prevent="submit">
            <!--<input type="hidden" name="_method" v-model="method"/>-->
            <input type="text" v-model="user.name">
            <button class="btn waves-effect waves-light" type="submit" name="action">Edit Profile
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import AWN from "awesome-notifications"

    export default {
        name: 'editProfile',
        components: {
            //
        },
        data () {
            return {
                form: {
                    name: '',
                    _method: 'put'
                }
            }
        },
        computed: {
            ...mapGetters({
                authenticated: 'auth/authenticated',
                user: 'auth/user'
            })
        },
        methods: {
            ...mapActions({
                editProfile: 'api/editProfile'
            }),

            submit () {
                let notifier = new AWN({
                    position: 'top-right',
                    durations: {
                        global: 1500
                    }
                })

                this.editProfile(this.user).then(() => {
                    // new AWN().success()
                    notifier.success('Successfully edited profile.')
                })
                    .catch(() => {
                        // new AWN().alert()
                        notifier.alert('Something went wrong.')
                    })
            }
        }
    }
</script>
