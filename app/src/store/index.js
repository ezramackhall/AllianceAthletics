import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from "firebase";

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedWorkouts: [
            {
                src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
                id: 'aamkjsn',
                title:'Pic 1',
            },
            {
                src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
                id: 'aamkjs',
                title:'Pic 2',
            },
            {
                src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
                id: 'aamjsn',
                title:'Pic 3',
            },
            {
                src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
                id: 'amkjsn',
                title:'Pic 4',
            },
        ],
        user: null,
        loading: false,
        error: null,
    },
    mutations: {
        setLoadedWorkouts(state, payload){
            state.loadedWorkouts = payload
        },
        createWorkout(state,payload){
            state.loadedWorkouts.push(payload)
        },
        setUser(state, payload){
            state.user = payload
        },
        setLoading(state, payload){
            state.loading = payload
        },
        setError(state, payload){
            state.error = payload
        },
        clearError(state){
            state.error = null
        }
    },
    actions: {
        loadActions({commit}){
            commit('setLoading', true)
            firebase.database().ref('workouts').once('value')
                .then((data) => {
                    const workouts = []
                    const obj = data.val()
                    for (let key in obj){
                        workouts.push({
                            id:key,
                            title: obj[key].title,
                            src: obj[key].src,
                            description: obj[key].description,
                            creatorId: obj[key].creatorId,
                        })
                    }
                    commit('setLoadedWorkouts', workouts)
                    commit('setLoading', false)
                })
                .catch(
                    (error) => {
                        console.log(error)
                        commit('setLoading', false)
                    }
                )
        },
        createWorkout({commit, getters}, payload){
            const workout = {
                title: payload.title,
                creatorId: getters.user.id,
                description: payload.description
            }
            let imageUrl
            let key
            firebase.database().ref('workouts').push(workout)
                .then((data) => {
                    key = data.key
                    return key
                })
                .then(key => {
                    const fileName  = payload.image.name
                    const ext = fileName.slice(fileName.lastIndexOf('.'))
                    return firebase.storage().ref('workouts/' + key + '.' + ext).put(payload.image)
                })
                .then(fileData => {
                    return fileData.ref.getDownloadURL()
                })
                .then((url) => {
                    imageUrl = url
                    return firebase.database().ref('workouts').child(key).update({src: url})
                })
                .then(()=>{
                    commit('createWorkout', {
                        ...workout,
                        src: imageUrl,
                        id: key
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        signUserUp({commit}, payload){
            commit('setLoading', true);
            commit('clearError');
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false);
                        const newUser = {
                            id: user.uid,
                            registeredWorkouts: []
                        };
                        commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        commit('setLoading', false);
                        commit('setError', error);
                    }
                )
        },
        signUserIn({commit}, payload){
            commit('setLoading', true);
            commit('clearError');
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false);
                        const newUser = {
                            id: user.uid,
                            registeredWorkouts: []
                        }
                        commit('setUser', newUser)
                    }
                )
                .catch(
                    error =>{
                        commit('setLoading', false);
                        commit('setError', error);
                        console.log(error)
                    }

                )
        },
        autoSignIn({commit}, payload){
          commit('setUser', {id:payload.uid, registeredWorkouts: []})
        },
        logout({commit}){
            firebase.auth().signOut()
            commit('setUser', null)
        },
        clearError({commit}){
            commit('clearError')
        }
    },
    getters:{
        loadedWorkouts(state){
            return state.loadedWorkouts
        },
        loadedWorkout(state){
            return (workoutID) => {
                return state.loadedWorkouts.find((workout) => {
                    return workout.id === workoutID
                })
            }
        },
        user (state){
            return state.user
        },
        loading (state){
            return state.loading
        },
        error (state) {
            return state.error
        }
    }
})
