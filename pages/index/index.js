//index.js
import { ajax } from '../../utils/util.js';
import { banners, hotlist } from '../../utils/data.js';
//获取应用实例
const app = getApp();

Page({
  data: {
    banners: banners,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    hotlist: hotlist,
  },
  //跳转详情
  gotoDetail: function(e) {
    console.log(e.currentTarget.dataset.id)
    app.navTo('mine')
  },
  onLoad: function () {
    /*wx.showLoading({
      title: '正在加载中...',
    })
    ajax(app.apis.banner).then(res => {
      this.setData(res.data)
    }).catch(res => { console.log(res); wx.hideLoading()})
    ajax(app.apis.hots).then(res => {
      this.setData(res.data)
      wx.hideLoading()
    }).catch(res => { console.log(res); wx.hideLoading() })*/
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})
