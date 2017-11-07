// pages/addrlist/addrlist.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addrlist: []
  },

  goAddress: function () {
    app.navTo('address');
  },

  editaddr: function (e) {
    let id = e.currentTarget.dataset.id;
    let addrlist = wx.getStorageSync('addrlist') || [];
    let index = addrlist.findIndex((item)=>{return item.id===id});
    app.navTo('address',addrlist[index]);
  },

  deladdr: function (e) {
    wx.showLoading({
      title: '删除中...',
    });
    let id = e.currentTarget.dataset.id;
    let addrlist = wx.getStorageSync('addrlist') || [];
    let index = addrlist.findIndex((item) => { return item.id === id });
    addrlist.splice(index,1);
    wx.setStorageSync('addrlist', addrlist)
    this.setData({
      addrlist: addrlist
    });
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let addrlist = wx.getStorageSync('addrlist') || [];
    this.setData({
      addrlist: addrlist
    })
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
    let addrlist = wx.getStorageSync('addrlist') || [];
    if (this.data.addrlist != addrlist) {
      this.setData({
        addrlist: addrlist
      })
    }
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