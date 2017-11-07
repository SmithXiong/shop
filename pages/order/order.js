// pages/order/order.js
import { ajax, plus, multi } from '../../utils/util.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    isHasAddr: false,
    cart: [],
    total: 0
  },

  //计算总价
  calcuPrice: function (cart) {
    let total = 0;
    cart.forEach((o) => {
      total = plus(total, multi(o.price, o.count))
    })
    return total;
  },

  goAddress: function () {
    app.navTo('address');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      let cart = wx.getStorageSync('cart') || [];
      let addrlist = wx.getStorageSync('addrlist') || [];
      let isHasAddr = addrlist.length === 0 ? false : true;
      let total = this.calcuPrice(cart);
      this.setData({ cart: cart, total: total, address: addrlist[0], isHasAddr: isHasAddr })
    } catch (e) {
      console.log(e)
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
    let addrlist = wx.getStorageSync('addrlist') || [];
    let isHasAddr = addrlist.length === 0 ? false : true;
    if (this.data.address == undefined) {
      this.setData({
        address: addrlist[0],
        isHasAddr: isHasAddr
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