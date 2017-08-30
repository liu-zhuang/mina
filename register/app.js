//app.js
App({
  onLaunch: function () {
    require('./sdk-v1.0.10');
    // 初始化 SDK
    wx.BaaS.init('92e445113eb494240c8a');
    // 微信用户登录小程序
    wx.BaaS.login().then((res) => {
      // 登录成功
      console.log(res);
    }, (err) => {
      // 系统级错误
    });


  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null
  }
})
