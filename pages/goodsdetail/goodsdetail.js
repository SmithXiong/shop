// pages/goodsdetail/goodsdetail.js
import {  multi } from '../../utils/util.js';
import { comments, goods } from '../../utils/data.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: {},
    collect: false,
    total: 0,
    comments: comments
  },

  bindCollect: function () {
    this.setData({collect:!this.data.collect})
    try {
      let collectlist = wx.getStorageSync('collectlist') || [];
      if (this.data.collect){
        collectlist.push(this.data.goods);
      }else{
        let index = collectlist.findIndex((o)=>{return o.id===this.data.goods.id});
        collectlist.splice(index,1)
      }
      wx.setStorageSync('collectlist', collectlist);
    } catch (e) {
      console.log(e)
    }
  },

  addgoods: function () {
    let goods = this.data.goods;
    goods.count++;
    let total = multi(goods.price, goods.count);
    this.setData({ goods: goods, total: total })
  },

  reducegoods: function () {
    let goods = this.data.goods;
    goods.count--;
    let total = multi(goods.price, goods.count);
    this.setData({ goods: goods, total: total })
  },

  createOrder: function () {
    try {
      wx.setStorageSync('goods',[this.data.goods]);
      app.navTo('order',{isDetail:true})
    } catch (e) {
      console.log(e)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      let index = goods[options.cateId].findIndex((o)=>{return o.id === options.id});
      let goodsdetail = goods[options.cateId][index];
      goodsdetail.src = goodsdetail.src.replace('190x190','290x290');
      let total = multi(goodsdetail.price,goodsdetail.count);
      let collect = false;
      try {
        let collectlist = wx.getStorageSync('collectlist') || [];
        let index = collectlist.findIndex((o) => { return o.id === goodsdetail.id });
        if (index!==-1){
          collect = true;
        }  
      } catch (e) {
        console.log(e)
      }
      this.setData({ goods: goodsdetail, total: total, collect: collect});
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