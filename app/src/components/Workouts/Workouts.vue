<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" sm="12"  v-for="workout in workouts" :key ="workout.id">
                <v-card class="d-flex info">
                    <v-container fluid>
                        <v-layout row wrap>
                            <v-flex xs5 sm4 m3>
                                <v-img
                                       :src="workout.src"
                                ></v-img>
                            </v-flex>
                            <v-flex xs7 sm8 m 9>
                                <v-card-title primart-title>
                                    <div>
                                        <h3 class="white--text" mb-0>{{workout.title}}</h3>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn text
                                           class="info"
                                           :to="'/workouts/' + workout.id">
                                        <v-icon left light>{{mdiArmFlex}}</v-icon>
                                        View Workout</v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mdiArmFlex} from '@mdi/js';
    export default {
        name: "Workouts",
        computed: {
            workouts () {
                return this.$store.getters.loadedWorkouts
            }
        },
        data(){
            return{
                mdiArmFlex,
            }
        }
    }
</script>