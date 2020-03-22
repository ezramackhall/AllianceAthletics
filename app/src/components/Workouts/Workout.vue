<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h4 class="black--text">{{workout.title}}</h4>
                    </v-card-title>
                    <v-img
                            :src='workout.src'
                            height="400px"
                    ></v-img>
                    <v-card-text>
                        <div>Date</div>
                        <div>{{workout.description}}
                        </div>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn class="black" dark>Register</v-btn>
                        </v-card-actions>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
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
        },
        data(){
            return{

            }
        }
    }
</script>

<style scoped>

</style>