import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Untreated from '@/components/Untreated'
import Completed from '@/components/Completed'
import UndoDetail from '@/components/UndoDetail'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/untreated',
    name: 'List',
    component: List,
    children: [{
      path: '/untreated',
      name: 'untreated',
      component: Untreated
    }, {
      path: '/completed',
      name: 'completed',
      component: Completed
    }]
  }, {
    path: '/untreated/:flowId',
    name: 'undoDetail',
    component: UndoDetail
  }]
})
