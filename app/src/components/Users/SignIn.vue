<template>
    <v-container>
            <v-row v-if="error">
                <v-col cols="12" sm="6" offset-sm="3">
                    <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
                </v-col>
            </v-row>
        <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
                <v-card>
                    <v-card-text>
                        <v-container>
                            <v-form @submit.prevent="onSignIn">
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field name="email"
                                                      label="Mail"
                                                      id="email"
                                                      v-model="email"
                                                      type="email"
                                                      :rules="[rules.required, rules.email]">

                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field name="password"
                                                      label="Password"
                                                      id="password"
                                                      v-model="password"
                                                      type="password"
                                                      :rules="[rules.required]">
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">
                                        <v-btn type="submit"
                                               :disabled="loading"
                                               :loading="loading"
                                        >
                                            Sign In
                                            <span slot="loader" class="custom-loader">
                                                <v-icon light>cached</v-icon>
                                            </span></v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "SignIn",
        data() {
            return {
                email: '',
                password: '',
                rules: {
                    required: value => !!value || 'Required.',
                    email: v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                }
            }
        },
        computed: {
            user (){
                return this.$store.getters.user
            },
            error(){
                return this.$store.getters.error
            },
            loading(){
                return this.$store.getters.loading
            }
        },
        watch: {
            user (value) {
                if (value !== null && value !== undefined){
                    this.$router.push('/')
                }
            }
        },
        methods: {
            onSignIn() {
                this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
            },
                onDismissed() {
                    console.log('Dismissed Alert!')
                    this.$store.dispatch('clearError')
            }
        },
        beforeMount() {
            this.$store.dispatch('clearError')
        }
    }
</script>

<style scoped>
    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }
    @-moz-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-o-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }

</style>