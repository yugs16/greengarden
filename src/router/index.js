import Vue from 'vue'
import Router from 'vue-router'

import Account from '../views/Account'
import Login from '../views/Login'
import Register from '../views/Register'

Vue.use(Router)

function getAccountRoute() {
  const loggedIn = localStorage.getItem('user')
  if (!loggedIn) return `/login`
  const user = JSON.parse(loggedIn) || {}

  return `/account/${user.id}`
}
const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: getAccountRoute() },
    { path: '/login', component: Login },
    { path: '/account/:id', component: Account },
    { path: '/register', component: Register },

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next()
})

export default router
