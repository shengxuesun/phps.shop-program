// 全局变量以g_开头
// 私有函数以_开头
import { Token } from 'token.js';
import { Config } from 'config.js';
class Base {
    constructor() { 
      this.baseRestUrl = Config.restUrl; 
      this.onPay = Config.onPay;
    }

    //http 请求类, noRefech为避免无线循环请求，不定义noRefech则默认为false
    request(params, noRefetch) {
        var that = this,
            url=this.baseRestUrl + params.url;
        if(!params.type){
            params.type='get';
        } 
        /*不需要再次组装地址*/
        //如果没有params.setUpUrl则是undefined，undefined==false结果为false,undefined==null结果为true
        if(params.setUpUrl==false){
            url = params.url;            
        }
        wx.request({
            url: url,
            data: params.data,
            method:params.type,
            header: {
                'content-type': 'application/json',
                'token': wx.getStorageSync('token')
            },
            success: function (res) { 
                // 判断以2（2xx)开头的状态码为正确
                // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
                var code = res.statusCode.toString();//状态码
                var startChar = code.charAt(0); //charAt方法 返回指定位置的字符.这里是看状态码第一位是2还是4
                if (startChar == '2') { 
                    params.sCallback && params.sCallback(res.data);
                } else {
                    if (code == '401') {
                        if (!noRefetch) { //避免无线循环请求
                          that._refetch(params);//重新从api获取token放到缓存中，再次执行wx.request
                        }
                    }
                    that._processError(res);//将错误console.log()
                    params.eCallback && params.eCallback(res.data);//若调用方法中有eCallback回调方法则返回
                }
            },
            fail: function (err) {
                //wx.hideNavigationBarLoading();
                that._processError(err);//将错误console.log()
                // params.eCallback && params.eCallback(err);
            }
        });
    }

    _processError(err){
        console.log(err);
    }

    // //若wx.request请求失败，则调用该方法
    // _refetch(param) {
    //     var token = new Token();    
    //     //重新从api获取token，再次执行wx.request
    //     token.getTokenFromServer((token) => {
    //         this.request(param, true);
    //     });
    // }

    // /*获得元素上的绑定的值*/
    // getDataSet(event, key) {
    //     return event.currentTarget.dataset[key];
    // };

};

export {Base};
