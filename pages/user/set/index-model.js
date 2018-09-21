/**
 * 如花拼团开源系统 -- 永久免费
 * ===============================================
 * 官方网址：http://www.phps.shop
 * 作者：光爵【API + 后台】 、 小草【小程序 + WAP】
 * QQ 交流群：728615087
 * Version：1.0.0
 */

import { Base } from '../../../utils/base.js';

class Index extends Base{
    constructor(){
        super();
    }
    //set页面
    getUserSetData(callback) {
      
      var that = this;
      var param = {
        url: 'newlist',

        sCallback: function (data) {
          callback && callback(data);
        }
      };
      this.request(param);
    } 

};

export {Index};