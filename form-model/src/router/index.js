import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Drag from '@/components/Drag'
import Dialog from '@/components/Dialog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Drag',
      component: Drag
    },
    {
      path: '/Drag',
      name: 'Drag',
      component: Drag
    },
    {
      path: '/Dialog',
      name: 'Dialog',
      component: Dialog
    },
  ]
})
