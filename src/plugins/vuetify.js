import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)
const opts = {
  // icons: {
  //   iconfont: 'md'
  //   // values: {
  //   //   nodata: {
  //   //     component: NoDataIcon
  //   //   },
  //   //   icon404: {
  //   //     component: Icon404
  //   //   }
  //   // }
  // },
  theme: {
    themes: {
      light: {
        primary: '#506AF1',
        secondary: '#A6A6A6',
        'grey-light': '#F5F6FA'
      }
    }
  }
}

export default new Vuetify(opts)
