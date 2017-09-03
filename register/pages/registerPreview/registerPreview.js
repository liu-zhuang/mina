// pages/registerPreview/registerPreview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userCollege: '',
    userName: '',
    userDharmaName: '',
    userAge: '',
    userNation: '',
    userSexy: '',
    userHasJoin: '',
    userSelf: '',
    userAddress: '',
    userHealth: '',
    userHeight: '',
    userIDNo: '',
    userTel: '',
    userMobile: '',
    userProject: '',
    userRemark: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that._getData(wx.getStorageSync('openid'))
      .then(res => {
        if (res) {
          const userInfo = res.value;
          that.setData({
            userCollege: userInfo['学历'],
            userName: userInfo['姓名'],
            userDharmaName: userInfo['法号'],
            userAge: userInfo['年龄'],
            userNation: userInfo['民族'],
            userSexy: userInfo['性别'],
            userHasJoin: userInfo['是否参加过行脚活动'],
            userSelf: userInfo['是否自愿参加'],
            userAddress: userInfo['家庭住址'],
            userHealth: userInfo['健康状况'],
            userHeight: userInfo['身高'],
            userIDNo: userInfo['身份证号'],
            userTel: userInfo['固定号码'],
            userMobile: userInfo['手机号码'],
            userProject: userInfo['具体行程'],
            userRemark: userInfo['随缘备注']
          });
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  _getData(key) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://api.wxappclub.com/get',
        data: {
          appkey: 'zj3j8biqu1jd8aucqb9hxum44htegwbg',
          key: key,
          type: 'xingjiaoReg'
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          if (res.data.success) {
            resolve(res.data.result);
          }
        }
      })
    })

  }
})