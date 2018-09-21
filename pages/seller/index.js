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
      { "id": 1, "name": "超值多种肉肉植物套餐值多种肉肉值多种肉肉值多种肉肉值多种肉肉值多种肉肉", "price": "10.00", "img_url": "1.jpg" },
      { "id": 2, "name": "精选6棵多肉植物", "price": "1.00", "img_url": "2.jpg" },
      { "id": 3, "name": "高端多肉植物", "price": "80.00", "img_url": "3.jpg" }],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    this.id = options.id;
    this._loadData();
  },
  //支付
  order: function (event) {
    
    wx.navigateTo({
      url: '../order/index'
    })
  },
  //商品详细信息
  detail: function (event) {
    var id = event.currentTarget.dataset['id'];
    wx.navigateTo({
      url: '../detail/index?id=' + id

    })
  },
  //点击收藏
  sc: function (e) {   
    var id = this.id;
    var data = { fav_id: this.aid, type: "shop", price: this.aprice, img_id: this.aimg_id };
    index.getSCData(data, (data) => {//传值给服务器 
      this.setData({
        Favorite: data,
      });
      wx.showToast({
        title: '成功',
        icon: 'success',// 'none'为无图标
        duration: 2000,//多少毫秒后消失
      }); 
    });
  },
  //删除收藏
  deletesc: function (e) {
    var id = this.id;
    index.getDeleteData(id, (data) => {//传值给服务器
      if (data.code == 201) {
        this.setData({
          Favorite: false,
        });
        //提示成功
        wx.showToast({
          title: '取消成功',
          icon: 'success',// 'none'为无图标
          duration: 2000,//多少毫秒后消失
        });
      } else {
        //提示失败
        wx.showToast({
          title: '失败',
          icon: 'none',// 'none'为无图标
          duration: 2000 //多少毫秒后消失
        });
      }
    });
  },
  _loadData: function (callback) {
    //加载中
    wx.showLoading({
      title: '加载中',
    });
    var that = this; //为了避免多个this冲突
    /*店铺信息*/
    index.getSellerData(that.id,(data) => { 
      this.aid = data.shop_id;
      this.aprice = '1';
      this.aimg_id = data.img_id; 
      that.setData({
        bannerArr: data 
      });
    });
    
    //判断收藏
    
    var type = 'shop';
    index.getFavgoodData(this.id, type, (data) => {
      console.log(data);
      that.setData({
        Favorite: data,
      });

    });
    /*店铺商品信息*/
    index.getShopPData(that.id, (data) => {
      wx.hideLoading();//结束加载
      that.setData({
        shoppArr: data,
        shopnum: data.length
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
    var id = this.id;
    return {
      title: '如花拼团',
      path: 'pages/seller/index?id=' + id 
    }
  }
})