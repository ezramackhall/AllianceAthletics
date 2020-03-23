<template>
    <v-container>
        <v-layout row wrap v-if = "loading">
            <v-flex xs12 class="text-center">
                <v-progress-circular indeterminate
                                     class="text--primary"
                                     :width="7"
                                     :size="70"
                >

                </v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout row wrap v-else>
            <v-flex xs10 offset-xs1 offset-sm0 sm12>
                <v-card>
                    <v-card-title>
                        <h4 class="black--text">{{workout.title}}</h4>
                        <template v-if="userIsCreator">
                            <v-spacer></v-spacer>
                            <app-edit-workout :workout ="workout"></app-edit-workout>
                        </template>
                    </v-card-title>
                    <v-img
                            :src='workout.src'
                            height="400px"
                    ></v-img>
                    <v-card-text>
                        <div>Date</div>
                        <div class="pt-4 pb-4"><h3>Description</h3></div>
                        <v-divider></v-divider>
                        <div>
                            <v-textarea
                                    :value="workout.description"
                                    readonly
                                    flat
                                    class="black--text noUnderline"
                                    no-resize
                                    autofocus
                                    solo
                            >
                            </v-textarea>
                        </div>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <template v-if="userIsAuthenticated">
                                <v-spacer></v-spacer>
                                <app-registration :workout ="workout"></app-registration>
                            </template>
                        </v-card-actions>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>ß
</template>

<script>
    export default {
        name: "Workout",
        computed: {
            workout (){
                let url = window.location.href;
                let tokens = url.split("/");
                let id = tokens[tokens.length-1];
                return this.$store.getters.loadedWorkout(id)
            },
            userIsAuthenticated(){
                return this.$store.getters.user !== null && this.$store.getters.user != undefined
            },
            userIsCreator(){
                if(!this.userIsAuthenticated) {
                    return false;
                }else{
                    return this.$store.getters.user.id === this.workout.creatorId
                }
            },
            loading(){
                return this.$store.getters.loading
            },
        },
        data(){
            return{

            }
        }
    }
</script>

<style scoped>
    .noUnderline{

    }
</style>