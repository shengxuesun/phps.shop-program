/**
 * 如花拼团开源系统 -- 永久免费
 * ===============================================
 * 官方网址：http://www.phps.shop
 * 作者：光爵【API + 后台】 、 小草【小程序 + WAP】
 * QQ 交流群：728615087
 * Version：1.0.0
 */

Page({

  /**
   * 页面的初始数据
   */
  data: {  
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function(options) {  
    var that=this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) { 
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) { 
              that.setData({
                user_name: res.userInfo.nickName
              });
            }
          })
        }
      }
    }); 
  },  
  //管理地址
  address: function (event) {    
    wx.navigateTo({
      url: '../address/addressall/addressall'
    })
  },
  //所有订单
  myorder: function (event) {    
    wx.navigateTo({
      url: '../orderall/index'
    })
  },
  set: function (event) {
    wx.navigateTo({
      url: '../user/set/set'
    })
  },
  //收藏
  collect: function (event) {
    wx.navigateTo({

      url: '../user/collect/collect'
    })
  },
  //历史浏览
  history: function (event) {
    wx.navigateTo({

      url: '../user/history/history'
    })
  },
  //绑定手机
  mobile: function (event) {
    wx.navigateTo({

      url: '../user/mobile/mobile'
    })
  }, 
  /*下拉刷新页面*/
  onPullDownRefresh: function () { 
    wx.stopPullDownRefresh(); 
  },
})