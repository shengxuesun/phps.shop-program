// pages/orderall/index.js
import { Index } from 'index-model.js';
var index = new Index(); //实例化 首页 对象 


Page({

  /**
   * 页面的初始数据
   */
  data: { 
    orderl: [
      { "cid": 1, "id": 1, "name": "超值多种肉肉植物套餐", "price": "10.00", "img_url": "1.jpg" },
      { "cid": 2, "id": 2, "name": "精选6棵多肉植物", "price": "1.00", "img_url": "2.jpg" },
      { "cid": 3, "id": 3, "name": "高端多肉植物", "price": "101.00", "img_url": "3.jpg" }],
    navbar: ['全部', '待付款', '待发货', '待评价'],
    currentTab: 0,
    OrderAll: ''
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    this._loadData();
  }, 
  _loadData: function (callback) { 
    //加载中
      wx.showLoading({
        title: '加载中',
      });
      var that = this; //为了避免多个this冲突
      //获取所有订单信息
      index.getOrderAllData((data) => { 
        wx.hideLoading();//结束加载
        that.setData({
          OrderAll: data
        });
        callback && callback();
      });
  },
   /*搜索订单信息*/
  blur: function (event) {
    var that = this;
    var name = event.detail.value; 
    if (name == '') {
      index.getOrderAllData((data) => {
        wx.hideLoading();//结束加载
        that.setData({
          OrderAll: data
        });
        callback && callback();
      });
    } else {
      index.getSearchData(name, (data) => {
        that.setData({
          OrderAll: data,
        });
      });
    }
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
  },
  //跳转到产品详细页
  detail: function (event) {
    var id = event.currentTarget.dataset['id'];
    wx.navigateTo({
      url: '../detail/index?id=' + id
      
    })
  },
  //店铺
  seller: function (event) {
    var cid = event.currentTarget.dataset['cid'];
    console.log('v1.0暂不支持多店铺');
    // wx.navigateTo({
    //   url: '../seller/index?id=' + cid      
    // })
  },
  //支付
  order: function (event) {
    var id = event.currentTarget.dataset['id']; 
    //拉起微信支付
    var that = this; 
    index.execPay(id, (statusCode) => {  
      if (statusCode == 2) {    
        wx.showToast({
          title: "支付成功",
          icon: 'success',
          duration: 2000
        });
        setTimeout(function () {
          wx.redirectTo({
            url: './index'
          });
        }, 2000);
      };
    });
  },
  //订单详情
  order_detail: function (event) {
    var id = event.currentTarget.dataset['id']; 
    wx.redirectTo({
      url: '../order/order_details/order_details?id=' + id 
    })
  }, 
  //物流
  logistics: function (event) {
    var id = event.currentTarget.dataset['id'];
    wx.navigateTo({
      //  url: '../order/logistics/logistics?id=' + id
      url: '../order/logistics/logistics'
    })
  },
  //信息提示
  ts: function (m) {
    wx.showToast({
      title: m,
      icon: 'none',
      duration: 2000
    })
  },
  //回到首页
  home: function (event) {
    wx.switchTab({
      url: '../home/home'
    })
  },
   

  /*
    //取消未支付的订单
    del_order: function (event) {
      var id = event.currentTarget.dataset['id'];
      var that = this;
      wx.showModal({
        title: '确定取消吗？',
        content: '取消了商品可能就会被别人抢走了哦',
        success: function (res) {
          if (res.confirm) {
            index.DelOrder(id,(data) => {
              if(data.code==201){
                wx.showToast({
                  title: "取消成功",
                  icon: 'success',
                  duration: 2000
                })
                index.getOrderAllData((data) => {
                  that.setData({
                    OrderAll: data
                  });
                });
              } else {
                wx.showToast({
                  title: "取消失败",
                  icon: 'none',
                  duration: 2000
                });
              }
            });
          }
        }
      })
    }
  */
})