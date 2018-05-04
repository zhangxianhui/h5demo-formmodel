import Vue from 'vue'
import Router from 'vue-router'
import Http from '@/service/http'
//日期选择器
import DatePicker from 'vue2-datepicker'


//消息提示
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
//工具
import '@/utils/tools'
import Main from '@/components/Main'
import AddData from '@/components/AddData'
import EditData from '@/components/EditData'

Vue.use(Router)
Vue.use(DatePicker)
Vue.use(Toast, {
    defaultType: 'center',
    duration: 3000,
    wordWrap: true,
    width: '150px'
})

//定义常量
Vue.prototype.const = {
    errorCode : {
      20000: 'token bad',
      20004: '参数错误',
      20201: '日期重复',
      22222: '服务器异常'
    },

}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/addData',
      name: 'AddData',
      component: AddData
    },
    {
      path: '/editData',
      name: 'EditData',
      component: EditData
    }
  ]
})
