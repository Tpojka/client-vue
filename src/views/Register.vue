<template>
    <form @submit.prevent="submit">
        <div class="row">
            <div class="col s6">
                <label>Name: </label>
                <input type="text" name="name" id="name" v-model="form.name"/>
            </div>
            <div class="col s6">
                <label>Email: </label>
                <input type="text" name="email" id="email" v-model="form.email"/>
            </div>
            <div class="col s6">
                <label>Password: </label>
                <input type="password" name="password" id="password" v-model="form.password"/>
            </div>
            <div class="col s6">
                <label>Password Confirmation: </label>
                <input type="password" name="password_confirmation" id="password_confirmation" v-model="form.password_confirmation"/>
            </div>
            <div class="col s6">
                <!--<button type="submit">Sign In</button>-->

                <button class="btn waves-effect waves-light" type="submit" name="action">Register Account
                    <i class="material-icons right"></i>
                </button>
            </div>
        </div>
    </form>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        name: 'register',
        components: {
            //
        },
        data () {
            return {
                form: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                }
            }
        },
        methods: {
            ...mapActions({
               register: 'auth/register'
            }),
            submit () {
                this.register(this.form).then(() => {
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
