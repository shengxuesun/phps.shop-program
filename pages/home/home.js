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
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id = options.id;
    this._loadData(); 
  },

  home: function (event) { 
    wx.switchTab({
      url: '../home/home'
    })
  },
  //跳转到分类
  category:  function (event) { 
    var id = event.currentTarget.dataset['id'];
    wx.navigateTo({
      url: '../category/index?id=' + id
    })
  },
  //商品
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
    // 获得bannar信息
    index.getBannerData((data) => {     
      that.setData({
        bannerArr: data,
      });

    });
    /*商品分类*/
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
    /*获取热销商品*/
    index.getHomeData((data) => { 
      wx.hideLoading(); //结束加载
      if(data!=0){
        that.setData({
          HomePArr: data,
        });  
        callback && callback();
      }
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