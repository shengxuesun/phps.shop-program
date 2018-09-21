/**
 * 如花拼团开源系统 -- 永久免费
 * ===============================================
 * 官方网址：http://www.phps.shop
 * 作者：光爵【API + 后台】 、 小草【小程序 + WAP】
 * QQ 交流群：728615087
 * Version：1.0.0
 */

import { Base } from '../../../utils/base.js';

class Index extends Base {
  constructor() {
    super();
  }

  //传值给服务器
  getAddRevData(id, callback) {
    
    var that = this;
    var param = {
      url: 'address/one',
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
  //传值给服务器用作更新
  getAddressData(data, callback) {

    var that = this;
    var param = {
      url: 'address/up',
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