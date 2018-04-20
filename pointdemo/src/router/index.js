import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Theme from '@/components/Theme'
import Point from '@/components/Point'
import SpecialUser from '@/components/SpecialUser'
import CommonUser from '@/components/CommonUser'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'Theme',
      component: Theme,
      children:[

        {
          path:"",
          redirect:"Point"
        },
        {
          path:"/Point",
          name: 'Point',
          component: Point,
        },
        {
          path:"/SpecialUser",
          name: 'SpecialUser',
          component: SpecialUser,
        },
        {
          path:"/CommonUser",
          name: 'CommonUser',
          component: CommonUser,
        }
      ]
      
    },

    

  ]
})
