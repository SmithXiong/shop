// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentSize: 0
  },

  clearCache: function () {
    wx.showModal({
      title: '提示',
      content: '清除缓存会清空购物车、订单、地址，确认清除吗？',
      success: function (res) {
        if (res.confirm) {
          wx.clearStorage();
          this.setData({ currentSize: 0 })
        } else if (res.cancel) {
          return;
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      let res = wx.getStorageInfoSync()
      this.setData({ currentSize: res.currentSize})
    } catch (e) {
      // Do something when catch error
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})