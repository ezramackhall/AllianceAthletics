import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import {store} from './store/index.js'
import * as firebase from "firebase";
import Alert from './components/Shared/Alert.vue'
import EditWorkoutDetails from "./components/Workouts/EditWotkoutDetails/EditWorkoutDetails";
import RegisterDialog from "./components/Workouts/Registration/RegisterDialog";

Vue.config.productionTip = false
Vue.component('app-alert', Alert)
Vue.component('app-edit-workout', EditWorkoutDetails)
Vue.component('app-registration', RegisterDialog)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyAb-peIzdegx6pqo6fO6wJUJ20pyk0-74A",
      authDomain: "alliance-athletics.firebaseapp.com",
      databaseURL: "https://alliance-athletics.firebaseio.com",
      projectId: "alliance-athletics",
      storageBucket: "gs://alliance-athletics.appspot.com",
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user){
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadActions')
  }
}).$mount('#app')
