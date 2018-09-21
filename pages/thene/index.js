/**
 * 如花拼团开源系统 -- 永久免费
 * ===============================================
 * 官方网址：http://www.phps.shop
 * 作者：光爵【API + 后台】 、 小草【小程序 + WAP】
 * QQ 交流群：728615087
 * Version：1.0.0
 */

import { Index } from 'index-model.js';
var index = new Index(); //实例化 首页 对象 


Page({

  /**
   * 页面的初始数据
   */
  data: {
    thenep: [
      { "id": 1, "name": "超值多种肉肉植物套餐", "price": "10.00", "img_url": "1.jpg" },
      { "id": 2, "name": "精选6棵多肉植物", "price": "1.00", "img_url": "2.jpg" },
      { "id": 3, "name": "高端多肉植物", "price": "101.00", "img_url": "3.jpg" }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id = options.id;
    this._loadData(); 
  },
  //商品详细信息
  detail: function (event) {
    var id = event.currentTarget.dataset['id'];
    wx.navigateTo({
      url: '../detail/index?id=' + id
    })
  },
  _loadData: function (callback) {
    //加载中
    wx.showLoading({
      title: '加载中',
    });
    var that = this; //为了避免多个this冲突
    /*商品信息*/
    index.getHomeData((data) => {
      wx.hideLoading();//结束加载      
      if (data != 0) {
        that.setData({
          bannerArr: data,
        });
      } 
      callback && callback();
    });
  },
  /*下拉刷新页面*/
  onPullDownRefresh: function () {
    this._loadData(() => {
      wx.stopPullDownRefresh()
    });
  },
  //分享效果
  onShareAppMessage: function () {
    return {
      title: '如花拼团',
      path: 'pages/home/home'
    }
  }
})