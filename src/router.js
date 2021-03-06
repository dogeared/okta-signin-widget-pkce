import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Profile from '@/views/Profile.vue'

import { callback } from './auth'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/profile', component: Profile },
    { path: '/authorization-code/callback', component: callback }
  ]
})
