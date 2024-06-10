import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _f4bf8e7e = () => interopDefault(import('..\\pages\\edit-account\\index.vue' /* webpackChunkName: "pages/edit-account/index" */))
const _85e789a8 = () => interopDefault(import('..\\pages\\home\\index.vue' /* webpackChunkName: "pages/home/index" */))
const _08685788 = () => interopDefault(import('..\\pages\\my-cart\\index.vue' /* webpackChunkName: "pages/my-cart/index" */))
const _4e95e87a = () => interopDefault(import('..\\pages\\product\\index.vue' /* webpackChunkName: "pages/product/index" */))
const _6d78effe = () => interopDefault(import('..\\pages\\my-cart\\order\\index.vue' /* webpackChunkName: "pages/my-cart/order/index" */))
const _7f6bf1ab = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _767e19f3 = () => interopDefault(import('..\\pages\\product\\_productId.vue' /* webpackChunkName: "pages/product/_productId" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/edit-account",
    component: _f4bf8e7e,
    name: "edit-account"
  }, {
    path: "/home",
    component: _85e789a8,
    name: "home"
  }, {
    path: "/my-cart",
    component: _08685788,
    name: "my-cart"
  }, {
    path: "/product",
    component: _4e95e87a,
    name: "product"
  }, {
    path: "/my-cart/order",
    component: _6d78effe,
    name: "my-cart-order"
  }, {
    path: "/",
    component: _7f6bf1ab,
    name: "index"
  }, {
    path: "/product/:productId",
    component: _767e19f3,
    name: "product-productId"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
