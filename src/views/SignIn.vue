<template>
    <form @submit.prevent="submit">
        <div class="row">
            <div class="col s6">
                <label>Email: </label>
                <input type="text" name="email" id="email" v-model="form.email"/>
            </div>
            <div class="col s6">
                <label>Password: </label>
                <input type="password" name="password" id="password" v-model="form.password"/>
            </div>
            <div class="col s6">
                <!--<button type="submit">Sign In</button>-->

                <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                    <i class="material-icons right"></i>
                </button>
            </div>
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
                this.login(this.form).then(() => {
                    this.$router.replace({
                        name: 'dashboard'
                    })
                })
                    .catch((e) => {
                        alert(e)
                    })
            }
        }
    }
</script>
