import { Base } from '../../utils/base.js';

class Index extends Base {
  constructor() {
    super();
     this._storageKeyName='newOrder';
  }
  
   /*下订单*/
    doOrder(param,callback){
        var that=this;
        var allParams = {
            url: 'order',
            type:'post',
            data:{products:param},
            sCallback: function (data) {
                that.execSetStorageSync(true);
                callback && callback(data);
            },
            eCallback:function(){
                }
            };
        this.request(allParams);
    }

  // 拉起微信支付 
  execPay(orderNumber, callback) {
    var allParams = {
      url: 'pay/pre_order',
      type: 'post',
      data: { id: orderNumber },
      sCallback: function (data) {
        console.log('wx-pay');
        var timeStamp = data.timeStamp;
        if (timeStamp) { //可以支付         
          wx.requestPayment({
            'timeStamp': timeStamp.toString(),
            'nonceStr': data.nonceStr,
            'package': data.package,
            'signType': data.signType,
            'paySign': data.paySign,
            success: function () {
              callback && callback(2);
            },
            fail: function (e) {
              callback && callback(1);
            }
          });
        } else {
          callback && callback(0);
        }
      }
    };
    this.request(allParams);
  }

    /*获得所有订单,pageIndex 从1开始*/
    getOrders(pageIndex,callback){
        var allParams = {
            url: 'order/by_user',
            data:{page:pageIndex},
            type:'get',
            sCallback: function (data) {
                callback && callback(data);  //1 未支付  2，已支付  3，已发货，4已支付，但库存不足
             }
        };
        this.request(allParams);
    }

    /*获得订单的具体内容*/
    getOrderInfoById(id,callback){
        var that=this;
        var allParams = {
            url: 'order/'+id,
            sCallback: function (data) {
                callback &&callback(data);
            },
            eCallback:function(){

            }
        };
        this.request(allParams);
    }

    /*本地缓存 保存／更新*/
    execSetStorageSync(data){
        wx.setStorageSync(this._storageKeyName,data);
    };

    /*是否有新的订单*/
    hasNewOrder(){
       var flag = wx.getStorageSync(this._storageKeyName);
       return flag==true;
    }


  //地址信息
  getAddressDefault(callback) {
    var that = this;
    var param = {
      url: 'address/get_default',
      type: 'post',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  } 
  //发起拼团，创建团单+订单
  CreateItem(data, callback) {
    var that = this;
    var param = {
      url: 'order/create',
      type: 'post',
      data: data,
      sCallback: function (data) {
        callback && callback(data);
      },
      eCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  } 

  //参加拼团，创建订单
  CreateOrder(data, callback) {
    var that = this;
    var param = {
      url: 'order/push',
      type: 'post',
      data: data,
      sCallback: function (data) {
        callback && callback(data);
      },
      eCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  } 
};

export { Index };