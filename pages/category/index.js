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
 
  data: { 
    is_hidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id = options.id; 
    if (options.show>0){
      this.setData({
        is_hidden:true
      });  
    }
    this._loadData(); 
  },
  home: function (event) {

    wx.switchTab({
      url: '../home/home'
    })
  },
  category: function (event) {
    var id = event.currentTarget.dataset['id']; 
    wx.redirectTo({
      url: './index?id=' + id
    })
  },
  category_into: function (event) {
    var id = event.currentTarget.dataset['id'];
    wx.navigateTo({
      url: './index?show=1&id=' + id
    })
  },
  detail: function (event) {
    var id = event.currentTarget.dataset['id'];
    wx.navigateTo({
      url: '../detail/index?id=' + id

    })
  }
  ,
  _loadData: function (callback) { 
    //加载中
    wx.showLoading({
      title: '加载中',
    });
    var that = this; //为了避免多个this冲突
    
    //顶级分类
    var is_category = wx.getStorageSync("category");
    if (is_category) {
      that.setData({
        CategoryArr: is_category,
      });
    } else {
      index.getCategoryData((data) => {
        wx.setStorageSync("category", data);
        that.setData({
          CategoryArr: data,
        });
      });
    };


    //商品信息
    index.getProductData(that.id,(data) => {      
      that.setData({
        HomePArr: data,
      });
    });
    //banner和子类
    index.getCategoryMData(this.id,(data) => {
      wx.hideLoading(); //结束加载 
      that.setData({
        CategoryMArr: data,
      });
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