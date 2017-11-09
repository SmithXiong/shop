// pages/order/order.js
import { ajax, plus, multi, guid, formatTime } from '../../utils/util.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    isHasAddr: false,
    cart: [],
    total: 0,
    description: '',
    payType: ['微信支付', '货到付款'],
    payIndex: 0
  },

  bindKeyInput: function (e) {
    this.setData({ description: e.detail.value })
  },

  bindPickerChange: function (e) {
    this.setData({ payIndex: e.detail.value })
  },

  //计算总价
  calcuPrice: function (cart) {
    let total = 0;
    cart.forEach((o) => {
      total = plus(total, multi(o.price, o.count))
    })
    return total;
  },

  createOrder: function () {
    let order = {};
    let count = this.data.cart.map(o => o.count).reduce((p, v) => { return p + v }, 0);
    order.id = guid();
    order.cart = this.data.cart;
    order.address = this.data.address;
    order.createTime = formatTime(new Date());
    order.total = this.data.total;
    order.count = count;
    order.payType = this.data.payType[this.data.payIndex];
    order.description = this.data.description;
    try {
      let orderlist = wx.getStorageSync('orderlist') || [];
      orderlist.unshift(order);
      wx.setStorageSync('orderlist', orderlist);
      wx.setStorageSync('cart', []);
      wx.showToast({
        title: '订单提交成功',
        duration: 1000,
        mask: true
      })
    } catch (e) {
      wx.showToast({
        title: '订单提交失败：'+e,
        duration: 1000,
        image: '../../static/nologin.png',
        mask: true
      })
    }
    setTimeout(function(){wx.navigateBack()},500);
  },

  goChooseAddr: function () {
    app.navTo('chooseaddr', { id: this.data.address.id});
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
    let addressSel = wx.getStorageSync('addressSel') || {};
    let isHasAddr = addrlist.length === 0 ? false : true;
    if (this.data.address == undefined) {
      this.setData({
        address: addrlist[0],
        isHasAddr: isHasAddr
      })
    }
    if (JSON.stringify(addressSel) !== '{}'){
      this.setData({
        address: addressSel
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