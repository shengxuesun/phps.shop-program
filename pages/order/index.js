// pages/order/index.js
import { Index } from 'index-model.js';
var index = new Index(); //实例化 首页 对象 

Page({

  /**
   * 页面的初始数据
   */ 
  data: {    
    flag2: true,
    // input默认是1
    num: 1,
    // 使用data数据对象设置样式名
    minusStatus: 'disabled',
    sku_id:null
  }, 
  onLoad: function (options) {
    this.id = options.id; 
   
    if (options.item != '') {
      this.item_id = options.item; 
      this.setData({
        item_id: options.item
      }); 
    }
    this.num = this.data.num;
    if (options.sku_id != ''){
      this.data.sku_id = options.sku_id;
      this.setData({
        sku_id: options.sku_id
      });  
    }    
    this.getcache(); 
  },  
  onShow:function(){
     this._loadData(); 
  },
  _loadData: function () { 
    var that = this; //为了避免多个this冲突
    //获取用户默认地址
    index.getAddressDefault((data) => {
      wx.hideLoading(); //结束加载
      this.address_id=data.id;
      that.setData({          
        address: data
      })
    });
  },
  /* 点击减号 */
  bindMinus: function () {
    this.num = this.data.num;
    // 如果大于1时，才可以减
    if (this.num > 1) {
      this.num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = this.num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: this.num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    this.num = this.data.num;
    // 不作过多考虑自增1
    this.num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = this.num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: this.num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    this.num = e.detail.value;
    // 将数值与状态写回
    this.setData({
      num: this.num
    });
  },
  //从缓存获取数据
  getcache:function(){ 
    var that = this;
    var data = wx.getStorageSync("cart");  
    that.aid = data.goods_id;
    that.aimg_id = data.img_id;
    that.shipping_money = data.shipping_fee;
    that.price = data.price;
    if (that.data.sku_id != null){
      that.price = data['sku'][that.data.sku_id]['price'];  
      that.skuid = data['sku'][that.data.sku_id]['sku_id'];  
      that.skuname = data['sku'][that.data.sku_id]['sku_name'];  
    }else{
      that.skuid = '';
      that.skuname = '';
    }
    this.setData({
      OrderData: wx.getStorageSync("cart"),
      price: that.price
    }); 
  },

  //弹窗支付窗口,又取消不支付时,弹窗窗口
  show2: function () {
    this.setData({ flag2: false })
  },
   //消失
  hide2: function () {
    this.setData({ flag2: true })
  }, 
  //新增地址
  address: function (event) {   
    wx.navigateTo({
      url: '../address/index'
    })
  },
  //商家
  seller: function (event) {
    var id = event.currentTarget.dataset['id'];
    wx.navigateTo({
      url: '../seller/index?id='+id
    })
  },
  //商品详细信息
  detail: function (event) {
    var id = event.currentTarget.dataset['id'];
    wx.navigateTo({
      url: '../detail/index?id='+id
    })
  }, 
  //跳转到全部地址
  jumpaddressall: function (event) {    
    wx.navigateTo({      
      url: '../address/addressall/addressall'
    })
  }, 
  //生成创团订单
  pay:function(){   
    wx.showLoading({
      title: '加载中',
    });  
    var data = {
      sku_id:this.skuid,sku_name:this.skuname,goods_id: this.aid, number: this.num, price: this.price, type: "pintuan", order_from: 0,payment_type: 'wx', shipping_money: this.shipping_money, address_id: this.address_id
    };   
    index.CreateItem(data, (oid) => { 
      wx.hideLoading(); //结束加载 
      if (oid > 0) {
        index.execPay(oid, (statusCode) => {
          if (statusCode == 2) {
            wx.showToast({
              title: "支付成功",
              icon: 'success',
              duration: 2000
            });
            setTimeout(function () {
              wx.redirectTo({
                url: '../orderall/index'
              });
            }, 2000);
          }
          else{
            //this.setData({ flag2: false })  //提醒再次支付
            wx.reLaunch({
              url: '../user/index'
            });
          }
        }); 
      } else {
        wx.showToast({
          title: oid.msg,
          icon: 'none',    //'none'为无图标
          duration: 3000   //多少毫秒后消失
        });
      }
    });
  },

  //生成参团订单
  ct_pay: function () {
    var data = {
      sku_id: this.skuid,item_id: this.item_id,sku_name: this.skuname, goods_id: this.aid, number: this.num, price: this.price, type: "pintuan", order_from: 0, payment_type: 'wx', shipping_money: this.shipping_money, address_id: this.address_id
    };
     
    index.CreateOrder(data, (data) => { 
      if (data.code == 201) {
        index.execPay(oid, (statusCode) => {
          if (statusCode == 2) {
            wx.showToast({
              title: "支付成功",
              icon: 'success',
              duration: 2000
            });
            setTimeout(function () {
              wx.redirectTo({
                url: '../orderall/index'
              });
            }, 2000);
          } else {
            this.setData({ flag2: false })
          }
        }); 
      } else {
        wx.showToast({
          title: data.msg,
          icon: 'none',    //'none'为无图标
          duration: 3000   //多少毫秒后消失
        });
      }
    });
  },
 

  //信息询问
  ask: function () {
    var that = this;
    wx.showModal({
      title: '确定要放弃付款吗？',
      content: '您尚未完成支付，喜欢的商品可能会被抢空哦～',
      success: function (res) {
        if (res.confirm){
          wx.navigateTo({
            url: '../order/index'
          })
        }else if(res.cancel) {
          that.ts('您已放弃付款');
        }
      }
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
   
})