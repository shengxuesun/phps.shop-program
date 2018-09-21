import { Index } from 'index-model.js';
var index = new Index(); //实例化 首页 对象 


Page({ 
  data: { 
    sku_index: null,  //规格下标   
    indicatorDots: false, //banner
    autoplay: false,  //banner
    interval: 5000,   //banner
    duration: 1000,   //banner
    flag: true,   //显示规格
    flag1: true,  //显示服务
    cantuan:false, 
     
  },  
  onLoad: function (options) {
    this.id = options.id;    
    this._loadData();
  },
  //规格选择
  sku_select: function(event){
    var id = event.currentTarget.dataset['id'];    
    this.setData({
      sku_index: id
    });
  },
  //跳转到店铺,v1.0版暂不开放店铺功能
  seller: function (event) {
    var id = event.currentTarget.dataset['id'];     
    wx.navigateTo({
        url: '../seller/index?id=' + id 
    })
  },
  //点击收藏
  sc: function () {      
    var data = { fav_id: this.id, type: "goods", price: this.data.price, img_id: this.data.img_id};
    var that = this;
    index.getSCData(data,(data) => {  //传值给服务器 
      that.setData({
        Favgood: true
      });
      wx.showToast({
        title: '成功',
        icon: 'success',// 'none'为无图标
        duration: 2000,//多少毫秒后消失
      }); 
    });
  }, 
  //删除收藏
  deletesc: function () {
    var id = this.id;
    var that = this;
    index.getDeleteData(id, (data) => {       
      if (data.code == 201) {
        that.setData({
          Favgood: false
        });
        //提示成功 跳转
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
  //显示规格
  show: function () {
    this.setData({ flag: false })
    this.setData({ cantuan: false })
  },
  //参团 显示规格
  ct_show: function (event) {
    var tid = event.currentTarget.dataset['tid'];
    this.setData({ flag: false })
    this.setData({ cantuan: tid })
  },
  //隐藏规格
  hide: function () {
    this.setData({ flag: true })
  },
  //服务说明
  service: function () {
    this.setData({ flag1: false })
  },
  //隐藏服务
  service_hide: function () {
    this.setData({ flag1: true })
  },
  //回到首页
  home: function (event) {
    wx.switchTab({
      url: '../home/home'
    })
  },
  //创团，带上商品，跳到下单页面
  order: function (event) { 
    var sku_id = event.currentTarget.dataset['sid'];  
    wx.setStorageSync("cart", this.data);
    if(sku_id == null){  
      var order_url = '../order/index';
    }else{  
      var order_url = '../order/index?sku_id=' + sku_id;
    }    
    wx.navigateTo({ 
      url: order_url
    });   
  },

  //参团，带上商品，跳到下单页面
  ct_order: function (event) { 
    var sku_id = event.currentTarget.dataset['sid'];
    var item_id = event.currentTarget.dataset['tid'];
    wx.setStorageSync("cart", this.data);
    if (sku_id == null) {
      var order_url = '../order/index?item=' + item_id;
    } else {
      var order_url = '../order/index?item=' + item_id + "&sku_id=" + sku_id;
    }
    wx.navigateTo({
      url: order_url
    });
  },

  _loadData: function (callback) {
    //加载中
    wx.showLoading({
      title: '加载中',
    });
    var that = this; //为了避免多个this冲突

    //获取待拼团的团单
    index.getCanTData(this.id,(data) => {
      console.log(data);
      that.setData({
        CanTArr: data,
      });
    });

    //判断收藏
    index.getFavgoodData(that.id,(data) => {    
      if(data==1){
        that.setData({
          Favgood: true,
        });
      }else{
        that.setData({
          Favgood: false,
        });
      }
    });
    // 从api获取商品信息
    index.getProductData(this.id, (data) => {
      wx.hideLoading(); //结束加载 
      this.data = data;
      this.sku = data.sku;
      if (this.sku == "") { 
        that.setData({
          goods: data,
          guige: 1, //无规格
        });
      } else {
        that.setData({
          goods: data,
          guige: 0, //有规格
          sku_index: 0,
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
    var id = this.id;
    return {
      title: '如花拼团开源系统',
      path: 'pages/detail/index?id=' + id
    }
  }
})
 