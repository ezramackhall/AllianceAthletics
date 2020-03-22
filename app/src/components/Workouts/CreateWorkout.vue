<template>
    <v-container>
        <v-row no-gutters class="pa-4">
            <v-col cols ="12">
                <h2 class="black--text"  align="center">Create a new Workout</h2>
            </v-col>
        </v-row>
        <v-form @submit.prevent="onCreateWorkout">
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field
                                v-model="title"
                                :rules="[rules.required, rules.counter]"
                                label="Title"
                                counter
                                maxlength="20"
                        ></v-text-field>
                        <v-file-input
                                ref="fileInput"
                                label="File input"
                                accept="image/*"
                                :clear-icon="mdiClose"
                                prepend-icon="mdi-camera"
                                @change="onFilePicked"
                        />
                        <v-textarea
                                solo
                                auto-grow
                                name="input-7-4"
                                v-model="description"
                                label="Excersise Description"
                        ></v-textarea>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <h2>Image Preview</h2>
                        <img :src="url" width="400px">
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn class="black white--text"
                               :disabled="!formIsValid"
                               @click="!formIsValid"
                               type="submit"
                        >Create Exercise</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-container>
</template>

<script>
    import {mdiClose} from '@mdi/js'
    export default {
        data () {
            return {
                mdiClose,
                title: 'Preliminary report',
                url: '',
                description: '',
                image: null,
                rules: {
                    required: value => !!value || 'Required.',
                    counter: value => value.length <= 20 || 'Max 20 characters',
                },
            }
        },
        computed: {
            formIsValid(){
                return this.title !== '' &&
                        this.description !== ''
            }
        },
        methods: {
            onCreateWorkout () {
                if(!this.formIsValid){
                    return
                }
                const workoutData = {
                    title: this.title,
                    src: this.url,
                    description: this.description,
                    image: this.image,
                };
                this.$store.dispatch('createWorkout', workoutData)
                this.$router.push('/workouts');
            },
            onFilePicked (event) {
                if(event) {
                    const file = event;
                    let fileName = file.name;
                    if (fileName.lastIndexOf('.') <= 0) {
                        return alert('Please add a valid file!')
                    }
                    const fileReader = new FileReader();
                    fileReader.addEventListener('load', () => {
                        this.url = fileReader.result
                    })
                    fileReader.readAsDataURL(file);
                    this.image = file;
                }else{
                    this.url = '';
                    this.image = null
                }
            }
        }
    }
</script>

<style scoped>

</style>