/**
 * 如花拼团开源系统 -- 永久免费
 * ===============================================
 * 官方网址：http://www.phps.shop
 * 作者：光爵【API + 后台】 、 小草【小程序 + WAP】
 * QQ 交流群：728615087
 * Version：1.0.0
 */

import { Index } from 'index-model.js';
var index = new Index(); //实例化 首页 对象 


Page({
  data:{
    select_img: "circle@selected.png", 
    not_select_img: "circle@noselected.png", 
  },
  //设为默认地址
  setAddress:function(e){
      var id = e.currentTarget.dataset['id'];         
      index.setAddressDefault(id,(data) => {  
        if(data.code == 201){
          wx.showToast({
            title: '设置成功',
            icon: 'success',//none为无图标
            duration: 2000 //多少毫秒后消失
          });
          setTimeout(function(){
            wx.navigateBack({
              
            })
          },2000);          
        }
      });    
  },  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    this.id = options.id;    
  },
  onShow: function(){
    this._loadData();
  },

  _loadData: function (callback) { 
    //加载中
    wx.showLoading({
      title: '加载中',
    });

    var that = this; //为了避免多个this冲突    
    //获取所有地址信息
    index.getAddressAllData((data) => { 
      wx.hideLoading(); //结束加载
      that.setData({
        AddressAllArr: data,
      });  
      callback && callback();//回调告知停止下拉刷新   
    });    
  },
  //跳转到新增地址页面
  address: function (event) {
    wx.navigateTo({
      url: '../../address/index'
    })
  },
  //删除地址
  deletes:function(e){
    var id = e.currentTarget.dataset['id'];    
    index.getDeleteData(id, (data) => {//传值给服务器
      if (data.code == 201) {
        //提示成功 跳转
        wx.showToast({
          title: '成功',
          icon: 'success',// 'none'为无图标
          duration: 2000,//多少毫秒后消失

        });
        setTimeout(function () {
          wx.redirectTo({
            url: './addressall'
          });
        }, 2000);
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
  //修改地址
  edit:function(event){
    var id = event.currentTarget.dataset['id'];   
    wx.redirectTo({
      url: '../revise/revise?id='+id 
    })
  },
  /*下拉刷新页面*/
  onPullDownRefresh: function () {
    this._loadData(() => {
      wx.stopPullDownRefresh()
    });
  },
})