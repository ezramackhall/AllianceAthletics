<template>
    <v-alert
            v-if="btn1"
            prominent
            type="error"
            :value="true"
            @input="onClose"
            :icon="mdiAlert"
    >
        <v-row align="center">
            <v-col class="grow"> {{text}}</v-col>
            <v-col class="shrink">
                <v-btn @click="onClose">
                    <v-icon>{{mdiClose}}</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-alert>
</template>

<script>
    import {mdiAlert} from '@mdi/js';
    import {mdiClose} from '@mdi/js';
    export default {
        name: "Alert",
        data(){
            return{
                btn1: true,
                mdiAlert,
                mdiClose,
            }
        },
        methods: {
            onClose(){
                this.$emit('dismissed')
            }
        },
        props: ['text']
    }
</script>

<style scoped>

</style>