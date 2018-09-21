import { Token } from 'utils/token.js';
var token = new Token(); 

App({

  onLaunch: function () {    
    token.verify(); //小程序初始化完成时就,调用token文件的verify方法，向api验证token
  }

})
