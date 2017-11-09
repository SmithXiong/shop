//app.js
App({
  onLaunch: function () {
    let _this = this;
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              _this.globalData.userInfo = res.userInfo
              _this.isLogin = true

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (_this.userInfoReadyCallback) {
                _this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  _this.globalData.userInfo = res.userInfo
                  _this.isLogin = true

                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (_this.userInfoReadyCallback) {
                    _this.userInfoReadyCallback(res)
                  }
                }
              })
            }
          })
        }
      }
    })
  },
  isLogin: false,
  globalData: {
    userInfo: null
  },
  cart: [],
  addrlist: [],
  apis: {
    banner: '/v1/banner',
    hots: '/v1/hotlist',
    categories: '/v1/categories',
    goods: '/v1/goodslist'
  },
  navTo(routerName, query){
    let routes = {
      index: "../index/index",
      category: "../category/category",
      mine: "../mine/mine",
      addrlist: "../addrlist/addrlist",
      address: "../address/address",
      chooseaddr: "../chooseaddr/chooseaddr",
      order: "../order/order",
      myorder: "../myorder/myorder",
      myinfo: "../myinfo/myinfo",
      setting: "../setting/setting",
      about: "../about/about"
    };

    let options = {};

    // 需要登录才能访问的路由
    let _this = this;
    let isLoginRoute = ['addrlist', 'address', 'order', 'myorder', 'myinfo'];
    if (!this.isLogin && isLoginRoute.find((item) => item == routerName)) {
      wx.showToast({
        title: '请先登录',
        duration: 1000,
        image: '/static/nologin.png',
        mask: true
      })
      options.url = routes.mine
      wx.switchTab(options)
      return
    }

    // tab页面只能用wx.switchTab()进行跳转
    let tabs = ['index', 'category', 'mine']
    if (tabs.find((item) => item == routerName)) {
      options.url = routes[routerName]
      wx.switchTab(options)
    }

    if (routes[routerName]) {
      options.url = routes[routerName]
    } else {
      wx.redirectTo({
        url: routes.index
      })
      return
    }


    if (query) {
      let arr = []
      for (let item of Object.keys(query)) {
        arr.push(item + '=' + query[item])
      }
      options.url += '?' + arr.join('&')
    }

    wx.navigateTo(options)
  }
})