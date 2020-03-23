<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="290">
            <template v-slot:activator="{ on }">
                <v-spacer></v-spacer>
                <v-btn depressed color="#d4ac74" v-on="on">
                    {{userIsRegistered ? 'Unregister' : 'Register'}}
                </v-btn>
            </template>
            <v-card>
                <v-card-title v-if="!userIsRegistered" class="headline">Registration</v-card-title>
                <v-card-title v-if="userIsRegistered" class="headline">Unregister</v-card-title>
                <v-card-text v-if="!userIsRegistered">
                    Are You Sure You Want To Register?
                </v-card-text>
                <v-card-text v-if="userIsRegistered">
                    Are You Sure You Want To Unregister?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="black--text" text @click="dialog = false">Cancel</v-btn>
                    <v-btn v-if="!userIsRegistered" class="gold-background" text @click="onSaveChanges">Register</v-btn>
                    <v-btn v-if="userIsRegistered" class="gold-background" text @click="onSaveChanges">Unregister</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {
        props: ['workout'],
        data () {
            return {
                dialog: false,
                rules: {
                    required: value => !!value || 'Required.',
                    counter: value => value.length <= 20 || 'Max 20 characters',
                },
                title: this.workout.title,
                description: this.workout.description,
            }
        },
        methods: {
            onSaveChanges(){
                if(this.userIsRegistered) {
                    this.$store.dispatch('unregisterUserFromWorkout', this.workout.id)
                }else{
                    this.$store.dispatch('registerUserForWorkout', this.workout.id)
                }
                this.dialog = false
            }
        },
        computed: {
            userIsRegistered () {
                return (this.$store.getters.user.registeredWorkouts.findIndex(workoutId => {
                    return workoutId === this.workout.id
                }) >= 0)
            }
        }
    }
</script>

<style scoped>
    .gold-background{
        background-color: #d4ac74;
        color: black;
    }
</style>