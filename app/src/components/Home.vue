<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 sm6 class="pa-4 text-center text-sm-right">
                <v-btn large
                       dark
                       class="black"
                       router to="/workouts">
                    Explore Workouts
                </v-btn>
            </v-flex>
            <v-flex xs12 sm6 class="pa-4 text-center text-sm-left">
                <v-btn large
                       dark
                       class="black"
                       router to="/newworkout">
                    Create
                </v-btn>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 class="text-center">
                <v-progress-circular indeterminate
                                     class="text--primary"
                                     :width="7"
                                     :size="70"
                                     v-if = "loading"
                >

                </v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 v-if="!loading">
                <v-carousel hide-delimiters
                            style="cursor: pointer"
                            :next-icon="mdiArrowRight"
                            :prev-icon="mdiArrowLeft"
                >
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
                        <v-carousel-item
                                v-for="(item) in items"
                                :key="item.id"
                                :src="item.src"
                                @click="onLoadWorkouts(item.id)"
                                reverse-transition="fade-transition"
                                transition="fade-transition">
                            <div class="title">
                                <p class="title-text">
                                    {{item.title}}
                                </p>
                            </div>
                        </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {mdiArrowRight} from '@mdi/js';
    import {mdiArrowLeft} from '@mdi/js';
    export default {
        data () {
            return {
                mdiArrowRight,
                mdiArrowLeft,
            }
        },
        computed: {
            items (){
                return this.$store.getters.loadedWorkouts
            },
            loading(){
                return this.$store.getters.loading
            }
        },
        methods: {
            onLoadWorkouts(id){
                this.$router.push('/workouts/'+ id)
            }
        }
    }
</script>

<style scoped>
    .title {
        width: 100%;
        position: absolute;
        alignment: center;
        bottom: 5px;
        color: white;
        padding: 20px;
        font-size: 2em;
        font-family: Courier;
    }
    .title-text{
        position: relative;
        left: 33%;
        width: 33%;
        text-align: center;
        background-color: rgba(0,0,0,0.5);
    }
</style>
