import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import About from "../components/About/About";
import Workouts from "../components/Workouts/Workouts";
import SignIn from "../components/Users/SignIn";
import SignUp from "../components/Users/SignUp";
import Workout from "../components/Workouts/Workout"
import CreateWorkout from "../components/Workouts/CreateWorkout";
import AuthGuard from "./auth-guard"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/workouts',
    name: 'Workouts',
    component: Workouts,
    beforeEnter: AuthGuard
  },
  {
    path: '/newworkout',
    name: 'CreateWorkout',
    component: CreateWorkout,
    beforeEnter: AuthGuard
  },
  {
    path: '/workouts/:ID',
    name: 'Workout',
    props: true,
    component: Workout
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
