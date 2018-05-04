import Vue from 'vue'
import Resource from 'vue-resource'
Vue.use(Resource)
Vue.http.options.root = process.env.BASE_URL;

Vue.prototype.httpService = {
  findAllData: function (api, params) {
    // if (typeof params == 'undefined') {
    //   return Vue.http.get(api)
    // } else {
      return Vue.http.get(api, {
		params:params
	  })
    // }
  },
  findDataById: function (id) {
    return Vue.http.get(`/api/v2/holiday/picture`, {
      params: {
        id: id
      },
    });
  },
  editData: function (api, params) {
    return Vue.http.post(api, params, {
      emulateJSON: true
    })
  },
  addData: function (api, params) {
    return Vue.http.put(api, params, {
      emulateJSON: true
    })
  },
  deleteDataById: function (id) {
    return Vue.http.delete(`/api/v2/holiday/picture`, {
		params: {
		  id: id
		},})
  },



}
