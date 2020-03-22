import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css'
import { mdiHumanHandsup } from '@mdi/js';
Vue.use(Vuetify);


export default new Vuetify({
    icons: {
        iconfont: 'mdiSVG', // default - only for display purposes
        'midHuman': mdiHumanHandsup
    }
});
