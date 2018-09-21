import {Base} from '../../utils/base.js';

class Index extends Base{
    constructor(){
        super();
    }
  //从API获取商品信息
  getProductData(id,callback) {      
    var that = this;
    var param = {
      url: 'product/' + id,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }  
  //判断收藏
  getFavgoodData(id,callback) {
    var that = this;
    var param = {
      url: 'favorite/get_one',
      type: 'post',
      data: { id:id},
      sCallback: function (data) {
        callback && callback(data);
      },
      eCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  } 
  //新增收藏
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
  //删除收藏
  getDeleteData(id, callback) {   
    var that = this;
    var param = {
      url: 'favorite/del',
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
  
  //获取待拼团的团单
  getCanTData(id,callback) {
    var that = this;
    var param = {
      url: 'product/'+id+'/item',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  } 
};

export {Index};