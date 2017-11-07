// pages/address/address.js
import { guid } from '../../utils/util.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    name: '',
    phone: '',
    address: '',
    submit: false,
    subtype: 'submit'
  },

  bindNameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  bindPhoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  bindAddressInput: function (e) {
    this.setData({
      address: e.detail.value
    })
  },

  formSubmit: function () {
    this.setData({
      submit: !this.data.submit
    });
    let addrlist = wx.getStorageSync('addrlist') || [];
    if (this.data.subtype === 'submit') {
      let id = guid();
      addrlist.push({ id: id, name: this.data.name, phone: this.data.phone, address: this.data.address });
    }else{
      let index = addrlist.findIndex((item)=>{return item.id === this.data.id});
      addrlist[index] = { id: this.data.id, name: this.data.name, phone: this.data.phone, address: this.data.address };
    }
    wx.setStorageSync('addrlist', addrlist)
    this.setData({
      submit: !this.data.submit
    })
    wx.navigateBack();
  },

  choooseloc: function () {
    wx.showLoading({
      title: '加载中...',
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userLocation']) {
          // 已经授权，可以直接调用
          wx.chooseLocation({
            success: res => {
              this.setData({
                address: res.address
              });
            },
            complete: () => {
              wx.hideLoading();
            }
          })
        } else {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              wx.chooseLocation({
                success: res => {
                  this.setData({
                    address: res.address
                  })
                },
                complete: () => {
                  wx.hideLoading();
                }
              })
            },
            fail() {
              wx.openSetting({
                success: (res) => {}
              })
            },
            complete: () => {
              wx.hideLoading();
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.setData(Object.assign({subtype:'edit'},options))
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