// pages/category/category.js
import { ajax, plus, multi } from '../../utils/util.js';
import { categories, goods } from '../../utils/data.js';
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartShow: false,
    categories: categories,
    allList: goods,
    goodslist: goods[categories[0].id],
    currentId: categories[0].id,
    cart: [],
    total: 0,
    count: 0
  },

  //切换分类
  changeCate: function (e) {
    let cateId = e.currentTarget.dataset.id;
    this.setData({ currentId: cateId, goodslist: this.data.allList[cateId] })
  },

  //计算总价
  calcuPrice: function (cart) {
    let total = 0;
    cart.forEach((o) => {
      total = plus(total,multi(o.price,o.count))
    })
    return total;
  },

  //add商品
  addgoods: function (e) {
    let goodId = e.currentTarget.dataset.id;
    let data = this.data.allList;
    let cart = this.data.cart;
    let i = data[this.data.currentId].findIndex((o) => { return o.id === goodId });
    data[this.data.currentId][i].count++;
    let k = cart.findIndex((o) => { return o.id === goodId });
    if (k === -1) {
      cart.push(data[this.data.currentId][i]);
    } else {
      cart[k].count = data[this.data.currentId][i].count;
    }
    let total = this.calcuPrice(cart);
    let count = cart.map(o => o.count).reduce((p, v) => { return p + v }, 0);
    this.setData({ allList: data, goodslist: data[this.data.currentId], total: total, count: count, cart: cart});
    wx.setStorageSync('cart', cart);
  },

  //reduce商品
  reducegoods: function (e) {
    let goodId = e.currentTarget.dataset.id;
    let data = this.data.allList;
    let cart = this.data.cart;
    let i = data[this.data.currentId].findIndex((o) => { return o.id === goodId });
    data[this.data.currentId][i].count--;
    let k = cart.findIndex((o) => { return o.id === goodId });
    if (k === -1) {
      if (data[this.data.currentId][i].count !== 0) {
        cart.push(data[this.data.currentId][i]);
      }
    } else {
      if (data[this.data.currentId][i].count !== 0) {
        cart[k].count = data[this.data.currentId][i].count;
      } else {
        cart.splice(k, 1)
      }
    }
    let total = this.calcuPrice(cart);
    let count = cart.map(o => o.count).reduce((p, v) => { return p + v }, 0);
    let obj = { allList: data, goodslist: data[this.data.currentId], total: total, count: count, cart: cart };
    if (count === 0 && this.data.cartShow){
      obj = Object.assign(obj, { cartShow: !this.data.cartShow})
    }
    this.setData(obj);
    wx.setStorageSync('cart', cart);
  },

  //显示购物列表
  showCart: function () {
    let _this = this;
    if (this.data.count !== 0) {
      this.setData({ cartShow: !this.data.cartShow })
    }
  },

  //清空购物车
  clearCart: function () {
    wx.setStorageSync('cart', []);
    this.setData({ allList: goods, goodslist: goods[this.data.currentId], total: 0, count: 0, cart: [], cartShow: !this.data.cartShow })
  },

  //下订单
  goOrder: function () {
    if(this.data.count === 0) {
      wx.showToast({
        title: '请选择商品',
        duration: 1000,
        image: '../../static/nologin.png',
        mask: true
      })
    }else{
      app.navTo('order');
    }
  },

  goDetail: function (e) {
    let options = {id:e.currentTarget.dataset.id,cateId:e.currentTarget.dataset.cateid};
    app.navTo('goodsdetail',options);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      let res = wx.getSystemInfoSync();
      let cart = wx.getStorageSync('cart') || [];
      let total = this.calcuPrice(cart);
      let count = cart.map(o => o.count).reduce((p, v) => { return p + v }, 0);
      let allGoods = goods;
      for (let item of cart) {
        let index = allGoods[item.cateId].findIndex((o) => { return o.id === item.id });
        allGoods[item.cateId][index].count = item.count;
      }
      this.setData({ allList: allGoods, goodslist: allGoods[categories[0].id], cart: cart, total: total, count: count })
    } catch (e) {
      console.log(e)
    }
    /*wx.showLoading({
      title: '正在加载中...',
    })
    ajax(app.apis.categories).then(res => {
      this.setData({ categories: res.data.categories, currentId: res.data.categories[0].id})
    }).catch(res => { console.log(res); wx.hideLoading() })
    ajax(app.apis.goods).then(res => {
      this.setData({ allList: res.data.allList, goodslist: res.data.allList[this.data.currentId]})
      wx.hideLoading()
    }).catch(res => { console.log(res); wx.hideLoading() })*/
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
    try {
      let cart = wx.getStorageSync('cart') || [];
      if(cart.length !== this.data.cart.length){
        let total = this.calcuPrice(cart);
        let count = cart.map(o => o.count).reduce((p, v) => { return p + v }, 0);
        let allGoods = this.data.allList;
        for (let item of Object.keys(allGoods)) {
          allGoods[item].forEach((o) => {
            o.count = 0;
          })
        }
        this.setData({ allList: allGoods, goodslist: allGoods[this.data.currentId], cart: cart, total: total, count: count })
      }
    } catch (e) {
      console.log(e)
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