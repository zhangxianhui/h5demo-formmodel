import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Frmzyj from '@/components/Frmzyj'
import Ylzqmj from '@/components/Ylzqmj'

import Yjfz from '@/components/Yjfz'
import YjfzList from '@/components/Yjfz_list'

import Bljk from '@/components/Bljk'
import BljkList from '@/components/Bljk_list'

import ylzqmjList from '@/components/Ylzqmj_list'

import Yyxq from '@/components/Yyxq'
import Hjws from '@/components/Hjws'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
    
    },{
      path: '/frmzyj',
      name: 'frmzyj',
      component: Frmzyj,
     
      children:[
        {
          path: '/',
          redirect: 'yjfz',
          
        },{
        path:'yjfz',
        name:'yjfz',
        component:Yjfz,
       
      },{
        path:'bljk',
        name:'bljk',
        component:Bljk,
       
      },{
        path:'hjws',
        name:'hjws',
        component:Hjws,
       
      }
    ]
    },{
      path: '/ylzqmj',
      name: 'ylzqmj',
      component: Ylzqmj,
      
    },
    {
      path: '/ylzqmjList',
      name: 'ylzqmjList',
      component: ylzqmjList,
    },
    {
      path:'/frmzyj/yjfz/list',
      name:'yjfzList',
      component:YjfzList,
     
    },{
      path:'/frmzyj/bljk/list',
      name:'bljkList',
      component:BljkList,
      
     
    },{
      path:'/frmzyj/bljk/list/yyxq',
      name:'yyxq',
      component:Yyxq,
     
    }
  ]
})
