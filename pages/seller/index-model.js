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
    /*店铺商品信息*/
    getShopPData(id,callback){
       
        var that=this;
        var param={
          url: 'shop/'+id+'/product',

            sCallback:function(data){  
                callback && callback(data);
            }
        };
        this.request(param);
    }  
    /*店铺信息*/
    getSellerData(id,callback) {
        
        var that = this;
        var param = {
          url: 'shop/' + id+'/info',

          sCallback: function (data) {
            callback && callback(data);
          }
        };
        this.request(param);
      }  
  //判断收藏
  getFavgoodData(id, type, callback) {
    var that = this;
    var param = {
      url: 'favorite/get_one',
      type: 'post',
      data: { id: id,  type:type},
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  } 
  //传值给服务器
  getSCData(data, callback) {

    var that = this;
    var param = {
      url: 'favorite/add',
      type: 'post',
      data: data,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
  //传id给服务器,删除
  getDeleteData(id, callback) {

    var that = this;
    var param = {
      url: 'favorite/del',
      type: 'post',
      data: { id: id },
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  } 

};

export {Index};