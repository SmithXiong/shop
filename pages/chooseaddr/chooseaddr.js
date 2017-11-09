// pages/chooseaddr/chooseaddr.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addrlist: [],
  },

  chooseAddr: function (e) {
    let list = this.data.addrlist;
    let index = e.currentTarget.dataset.index;
    list.forEach((item,i) => {
      item.selected = i===index ? true : false;
    })
    this.setData({addrlist:list})
    wx.setStorageSync('addressSel', list[index]);
    wx.navigateBack();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let addrlist = wx.getStorageSync('addrlist') || [];
    let id = options.id;
    addrlist = addrlist.map((item)=>{
      return item.id === id ? Object.assign(item, { selected: true }) : Object.assign(item, { selected: false })
    })
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