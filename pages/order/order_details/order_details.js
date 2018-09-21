// pages/order/order_details.js
import { Index } from 'index-model.js';
var index = new Index(); //实例化 首页 对象 

Page({
  data:{

  },
  onLoad: function (options) {
    this.id = options.id;
    this._loadData();
  },
  //去支付 
  order: function () { 
    //拉起微信支付
    var that = this; 
    index.execPay(that.id, (statusCode) => {
      if (statusCode == 1){
        wx.showToast({
          title: "支付成功",
          icon: 'success',
          duration: 2000
        });
        setTimeout(function () {
          wx.redirectTo({
            url: '../../orderall/index'
          });
        }, 2000);
      }
    });
  },
  //店铺
  seller: function (event) {
    var id = this.goods.item.shop_id;
    console.log('v1.0暂不支持多店铺');
    // wx.navigateTo({
    //   url: '../../seller/index?id=' + id
    // })
  },
  //商品
  detail: function (event) {
    var id = this.goods.goods_id;
    wx.navigateTo({
      url: '../../detail/index?id=' + id
    })
  },
  //取消未支付的订单
  del_order: function (event) {
    var id = this.goods.order_id;
    var that = this;
    wx.showModal({
      title: '确定取消吗？',
      content: '取消了商品可能就会被别人抢走了哦',
      success: function (res) {
        if (res.confirm) {
          index.DelOrder(id, (data) => {
            if (data.code == 201) {
              wx.showToast({
                title: "取消成功",
                icon: 'success',
                duration: 2000
              });
              setTimeout(function () {
                wx.redirectTo({
                  url: '../../orderall/index',
                })
              }, 2000);
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
  },
  _loadData: function (callback) {
    //加载中
    wx.showLoading({
      title: '加载中',
    });
    var that = this; //为了避免多个this冲突    
    //获取订单详情
    index.getOrderDetailsData(this.id,(data) => {  
      wx.hideLoading(); //结束加载    
      this.goods = data; 
      that.setData({
        OrderDetails: data,
      });
    });   
  }
  
})