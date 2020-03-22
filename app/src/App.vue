<template>
  <v-app>
      <v-navigation-drawer v-model="sideNav"
                           absolute
                           temporary>
          <v-list>
              <v-list-item v-for="item in menuItems" :key="item.title"
                           link
                           router
                           :to="item.link"
              >
                  <v-list-item-avatar>
                      <v-icon>{{item.icon}}</v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                      <v-list-item-title>{{item.title}}</v-list-item-title>
                  </v-list-item-content>
              </v-list-item>
              <v-list-item
                           link
                           router
                           v-if="userIsAuth"
                           @click="logout"
              >
                  <v-list-item-avatar>
                      <v-icon>exit_to_app</v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                      <v-list-item-title>Logout</v-list-item-title>
                  </v-list-item-content>
              </v-list-item>
          </v-list>

      </v-navigation-drawer>
      <v-app-bar app
                 dark
                 color="black">
          <v-btn depressed
                 x-small height="100%"
                 @click="sideNav = !sideNav"
                 class="hidden-sm-and-up">
              <v-icon>mdi-menu</v-icon>
          </v-btn>
          <v-btn depressed
                 height="100%"
                 class="black"
          ><router-link to="/"
                        tag="span"
                        style="cursor: pointer">
              <v-img src="./assets/Alliance_Athletics-03_W.png"
                     max-height=100%
                     max-width="12vh"
                     class="hidden-xs-only"
              ></v-img>
              <v-img src="./assets/Alliance_Athletics-02_W.png"
                     max-height=50%
                     max-width="5vh"
                     class="hidden-sm-and-up"
              ></v-img>
          </router-link>
          </v-btn>
           <v-spacer></v-spacer>
           <v-toolbar-items v-for="item in menuItems" :key="item.title"
                            class="hidden-xs-only">
                   <v-btn depressed
                          class="black"
                          router
                          :to="item.link">
                       <v-icon>{{item.icon}}</v-icon>
                       {{item.title}}
                   </v-btn>
           </v-toolbar-items>
          <v-toolbar-items class="hidden-xs-only" v-if="userIsAuth">
              <v-btn depressed
                     class="black"
                     router
                     @click="logout">
                  <v-icon>exit_to_app</v-icon>
                  Logout
              </v-btn>
          </v-toolbar-items>
       </v-app-bar>
    <main class="black--text">
        <v-app-bar></v-app-bar>
        <router-view ></router-view>
    </main>
  </v-app>
</template>

<script>

export default {
  data () {
    return {
        sideNav: false,
    }
  },
    computed: {
      menuItems() {
          let menuItems = [
              {icon: 'room', title: 'About', link: '/about'},
              {icon: 'face', title: 'Sign Up', link: '/signup'},
              {icon: 'lock_open', title: 'Sign In', link: '/signin'}
          ]
          if(this.userIsAuth){
              menuItems = [
                  {icon: 'mdi-account', title: 'View Workouts', link: '/workouts'},
                  {icon: 'room', title: 'About', link: '/about'},
              ]
          }
          return menuItems
      },
        userIsAuth(){
          return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        },
    },
    methods: {
      logout(){
          this.$store.dispatch('logout')
      }
    }
}
</script>

<style lang="scss">
  @import "styles/main.scss";
</style>
