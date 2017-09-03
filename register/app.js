//app.js
App({
  onLaunch: function () {
    require('./sdk-v1.0.10');
    // 初始化 SDK
    wx.BaaS.init('92e445113eb494240c8a');
    // 微信用户登录小程序
    wx.BaaS.login().then((res) => {
      // 登录成功
      wx.setStorageSync('openid', key)
    }, (err) => {
      // 系统级错误
    });
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.wxappclub.com/wxLogin',
            data: {
              appkey: "zj3j8biqu1jd8aucqb9hxum44htegwbg",
              code: res.code
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              var sessionId = res.data.result;
              wx.getUserInfo({
                success: function (res) {
                  var encryptedData = res.encryptedData;
                  var iv = res.iv;
                  wx.request({
                    url: 'https://api.wxappclub.com/wxUser',
                    data: {
                      appkey: "zj3j8biqu1jd8aucqb9hxum44htegwbg",
                      sessionId: sessionId,//调用Api中心wxLogin后可获得
                      encryptedData: encryptedData,
                      iv: iv
                    },
                    header: {
                      'content-type': 'application/json'
                    },
                    success: function (res) {
                      wx.setStorageSync('openid', res.data.openId)
                    }
                  })
                }
              })
            }
          })
        }
      }
    })
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
