import { Base } from '../../utils/base.js';

class Index extends Base {
  constructor() {
    super();
  }
  /*
   * 拉起微信支付
   * params:
   * norderNumber - {int} 订单id
   * return：
   * callback - {obj} 回调方法 ，返回参数 可能值 0:商品缺货等原因导致订单不能支付;  1: 支付失败或者支付取消； 2:支付成功；
   * */ 
  execPay(orderNumber, callback) {
    var allParams = {
      url: 'pay/pre_order',
      type: 'post',
      data: { id: orderNumber },
      sCallback: function (data) { 
        console.log(data);
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
  /*搜索订单信息*/

  getSearchData(name, callback) {
    var that = this;
    var param = {
      url: 'order/search',
      type: 'post',
      data: { name: name },
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }  
  
  //获取该用户所有订单
  getOrderAllData(callback) {
    var that = this;
    var param = {
      url: 'order/all',
      type: 'post',      
      sCallback: function (data) { 
        callback && callback(data);
      } 
    };
    this.request(param);
  } 
  //取消未支付的订单
  DelOrder(id,callback) { 
    var that = this;
    var param = {
      url: 'order/del_order',
      type: 'post',
      data: {id:id},
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