import { Base } from '../../../utils/base.js';

class Index extends Base {
  constructor() {
    super();
  }
  /*
   * 拉起微信支付
   * */
  execPay(orderNumber, callback) {
    var allParams = {
      url: 'pay/pre_order',
      type: 'post',
      data: { id: orderNumber },
      sCallback: function (data) { 
        callback && callback(1); 
      }
    };
    this.request(allParams);
  }
  
  //传order的值给服务器
  getOrderDetailsData(id,callback) {
    
    var that = this;
    var param = {
      url: 'order/get_order_one',
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
  //取消未支付的订单
  DelOrder(id, callback) { 
    var that = this;
    var param = {
      url: 'order/del_order',
      type: 'post',
      data: { id: id },
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