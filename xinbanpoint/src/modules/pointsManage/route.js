import PointsManageDashboard from './index.vue';
import Points from './pages/points.vue'
import CommonUserStat from './pages/commonUserStat'
import SpecialUserStat from './pages/specialUserStat.vue'

export default {
    path: '/points_manage',
    component: PointsManageDashboard,
    children: [
      {
        path:"",
        redirect:"points"
      },
      {
        path:"points",
        name: 'points',
        component: Points,
      },
     
      {
        path:"commonUserStat",
        name: 'commonUserStat',
        component: CommonUserStat,
      },
      {
        path:"specialUserStat",
        name: 'specialUserStat',
        component: SpecialUserStat,
      }
    ]
}
