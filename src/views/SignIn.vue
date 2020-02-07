<template>
    <form @submit.prevent="submit">
        <div>
            <label>Email: </label>
            <input type="text" name="email" id="email" v-model="form.email"/>
        </div>
        <div>
            <label>Password: </label>
            <input type="password" name="password" id="password" v-model="form.password"/>
        </div>
        <div>
            <button type="submit">Sign In</button>
        </div>
    </form>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        name: 'login',
        components: {
            //
        },
        data () {
            return {
                form: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            ...mapActions({
               login: 'auth/login'
            }),
            submit () {
                this.login(this.form)
            }
        }
    }
</script>
