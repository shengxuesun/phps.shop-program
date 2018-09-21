/**
 * 如花拼团开源系统 -- 永久免费
 * ===============================================
 * 官方网址：http://www.phps.shop
 * 作者：光爵【API + 后台】 、 小草【小程序 + WAP】
 * QQ 交流群：728615087
 * Version：1.0.0
 */

import {Base} from '../../utils/base.js';

class Index extends Base{
    constructor(){
        super();
    } 
    //分类导航
  getCategoryData(callback) {
    var that = this;
    var param = {
      url: 'category/1',

      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }  
  //分类信息
  getCategoryMData(cid,callback) { 
    var param = {
      url: 'category/cid/'+cid,

      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }  
  //商品信息
  getProductData(id,callback) {

    var that = this;
    var param = {
      url: 'category/'+id+'/products',

      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  } 
};

export {Index};