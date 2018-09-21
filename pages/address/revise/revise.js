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


var address = require('../../../utils/city.js')
var animation
Page({

  /**
   * 页面的初始数据
   * 当前    provinces:所有省份
   * citys选择省对应的所有市,
   * areas选择市对应的所有区
   * provinces：当前被选中的省
   * city当前被选中的市
   * areas当前被选中的区
   */
  data: {
    menuType: 0,
    begin: null,
    status: 1,
    end: null,
    isVisible: false,
    animationData: {},
    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],
    provinces: [],
    citys: [],
    areas: [],
    province: '',
    city: '',
    area: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id = options.id;

    this._loadData();
    // 初始化动画变量
    var animation = wx.createAnimation({
      duration: 500,
      transformOrigin: "50% 50%",
      timingFunction: 'ease',
    })
    this.animation = animation;
    // 默认联动显示北京
    var id = address.provinces[0].id
    this.setData({
      provinces: address.provinces,
      citys: address.citys[id],
      areas: address.areas[address.citys[id][0].id],
    }) 
  },
  hideMenuTap: function (e) {
    this.startAnimation(false, -200)
  },
  // 执行动画
  startAnimation: function (isShow, offset) {
    var that = this
    var offsetTem
    if (offset == 0) {
      offsetTem = offset
    } else {
      offsetTem = offset + 'rpx'
    }
    this.animation.translateY(offset).step()
    this.setData({
      animationData: this.animation.export(),
      isVisible: isShow
    })
    console.log(that.data)
  },


  sureDateTap: function () {
    this.data.pageNo = 1
    this.startAnimation(false, -200)
  },

  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    var that = this

    if (that.data.addressMenuIsShow) {
      return
    }
    that.startAddressAnimation(true)
  },
  // 执行动画
  startAddressAnimation: function (isShow) {
    console.log(isShow)
    var that = this
    if (isShow) {
      that.animation.translateY(0 + 'vh').step()
    } else {
      that.animation.translateY(40 + 'vh').step()
    }
    that.setData({
      animationAddressMenu: that.animation.export(),
      addressMenuIsShow: isShow,
    })
  },
  // 点击地区选择取消按钮
  cityCancel: function (e) {
    this.startAddressAnimation(false)
  },
  // 点击地区选择确定按钮
  citySure: function (e) {
    var that = this
    var city = that.data.city
    var value = that.data.value
    that.startAddressAnimation(false)
    // 将选择的城市信息显示到输入框
    // var areaInfo = that.data.provinces[value[0]].name + ',' + that.data.citys[value[1]].name + ',' + that.data.areas[value[2]].name
    var areaInfo1 = that.data.provinces[value[0]].name
    var areaInfo2 = that.data.citys[value[1]].name
    var areaInfo3 = that.data.areas[value[2]].name
    that.setData({
      areaInfo1: areaInfo1,
      areaInfo2: areaInfo2,
      areaInfo3: areaInfo3,
    })
  },
  hideCitySelected: function (e) {
    console.log(e)
    this.startAddressAnimation(false)
  },
  // 处理省市县联动逻辑
  cityChange: function (e) {
    console.log(e)
    var value = e.detail.value
    var provinces = this.data.provinces
    var citys = this.data.citys
    var areas = this.data.areas
    var provinceNum = value[0]
    var cityNum = value[1]
    var countyNum = value[2]
    if (this.data.value[0] != provinceNum) {
      var id = provinces[provinceNum].id
      this.setData({
        value: [provinceNum, 0, 0],
        citys: address.citys[id],
        areas: address.areas[address.citys[id][0].id],
      })
    } else if (this.data.value[1] != cityNum) {
      var id = citys[cityNum].id
      this.setData({
        value: [provinceNum, cityNum, 0],
        areas: address.areas[citys[cityNum].id],
      })
    } else {
      this.setData({
        value: [provinceNum, cityNum, countyNum]
      })
    }
    console.log(this.data)
  },
  //获取表单数据
  formSubmit: function (e) {
    var t = e.detail.value;
    var id = this.id;
    var name = t['name'];
    var mobile = t['mobile'];
    var province = t['province'];
    var city = t['city'];
    var county = t['county'];
    var detail = t['detail'];
    var data = { id:id,name: name, mobile: mobile, province: province, city: city, county: county, detail: detail };
    //获取地址
    index.getAddressData(data, (data) => {
      
      if (data.code == 201) {
        //提示成功 跳转
        wx.showToast({
          title: '成功',
          icon: 'success',// 'none'为无图标
          duration: 2000,//多少毫秒后消失

        });
        setTimeout(function () {
          wx.redirectTo({
            url: '../addressall/addressall'
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
  _loadData: function (callback) {
    //加载中
    wx.showLoading({
      title: '加载中',
    });
    var that = this; //为了避免多个this冲突
    // 获得 地址信息
    index.getAddRevData(that.id, (data) => {
      wx.hideLoading(); //结束加载
      that.setData({
        bannerArr: data,
        areaInfo1: data.province ,
        areaInfo2: data.city,
        areaInfo3: data.country,
      });

      
    });
    
  }

})

