import Vue from 'vue'
import Router from 'vue-router'
import { route as PointsManageRoute } from '../modules/pointsManage';

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      redirect: '/points_manage'
    },
    PointsManageRoute
  ]
})


// router.beforeEach((to, from, next) => {
//   console.log('rootRouter  to==>>',to);
//   if (to.name === 'login' || to.name === 'register' || store.getters.getToken) {
//     next(undefined);
//   } else {
//     // router.push('/auth');
//     next({
//       path:'/auth'
//     })
//   }
// })


export default router;