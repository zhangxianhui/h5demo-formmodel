import Vue from 'vue'
import Router from 'vue-router'
import Theme from '@/components/Theme'
import Point from '@/components/Point'
import CommonUserStat from '@/components/CommonUserStat'
import SpecialUserStat from '@/components/SpecialUserStat'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
          path:"/CommonUserStat",
          name: 'CommonUserStat',
          component: CommonUserStat,
        },
        {
          path:"/SpecialUserStat",
          name: 'SpecialUserStat',
          component: SpecialUserStat,
        }
      ]
      
    },

    

  ]
})
