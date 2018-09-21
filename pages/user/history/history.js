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
    historyp: [
      { "id": 1, "name": "超值多种肉肉植物套餐肉肉植物套肉肉", "price": "10.00", "img_url": "1.jpg" },
      { "id": 2, "name": "精选6棵多肉植物", "price": "1.00", "img_url": "2.jpg" },
      { "id": 3, "name": "高端多肉植物", "price": "101.00", "img_url": "3.jpg" }]
  },
  //商品详细信息
  detail: function (event) {
    wx.navigateTo({

      url: '../detail/index'
    })
  }
})