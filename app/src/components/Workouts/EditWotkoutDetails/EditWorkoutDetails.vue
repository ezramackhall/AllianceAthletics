<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="290">
            <template v-slot:activator="{ on }">
                <v-spacer></v-spacer>
                <v-btn depressed class="white" v-on="on">
                    <v-icon>edit</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="headline">Edit Workout</v-card-title>
                <v-card-text>
                    <v-text-field
                            v-model="title"
                            :rules="[rules.required, rules.counter]"
                            label="Title"
                            counter
                            maxlength="20"
                    ></v-text-field>
                    <v-textarea
                            solo
                            auto-grow
                            :rules="[rules.required]"
                            name="input-7-4"
                            v-model="description"
                            label="Excersise Description"
                    ></v-textarea>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">Close</v-btn>
                    <v-btn color="green darken-1" text @click="onSaveChanges">Update Info</v-btn>
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
                if(this.title.trim() === '' || this.description.trim() === ''){
                    return
                }
                this.dialog = false
                this.$store.dispatch('updateWorkoutDetails', {
                    id: this.workout.id,
                    title: this.title,
                    description: this.description
                })
            }
        }
    }
</script>

<style scoped>

</style>