//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    btnDisable: false,
    btnLoading: false,
    btnShowMyinfo: false,
    msg: '',
    sexyOptions: [
      { name: '男', value: '男', checked: false },
      { name: '女', value: '女', checked: false },],
    collegeOptions: ['博士', '硕士', '本科', '大专', '中专和中技', '高中', '初中', '小学', '其他'],
    collegeIndex: 0,
    healthOptions: ['健康', '有重大疾病'],
    healthIndex: 0,
    ProjectOptions: [
      { name: '全程：10/6-10/16:宁国禅寺-灵岩山寺-灵山大佛-宜兴大觉寺', value: '全程：10/6-10/16:宁国禅寺-灵岩山寺-灵山大佛-宜兴大觉寺', checked: false },
      { name: '灵岩山寺段：10/6-10/9：宁国禅寺-灵岩山寺', value: '灵岩山寺段：10/6-10/9：宁国禅寺-灵岩山寺', checked: false },
      { name: '灵山大佛段：10/10-12/灵岩山寺-灵山大佛', value: '灵山大佛段：10/10-10/灵岩山寺-灵山大佛', checked: false },
      { name: '宜兴大觉寺段：10/13-10/16：灵山大佛-宜兴大觉寺', value: '宜兴大觉寺段：10/13-10/16：灵山大佛-宜兴大觉寺', checked: false },
      { name: '随缘参加：时间自定，原则上来往交通、食住安排自行解决', value: '随缘参加：时间自定，原则上来往交通、食住安排自行解决', checked: false },
    ],
    userCollege: '',
    userName: '',
    userDharmaName: '',
    userAge: '',
    userNation: '',
    userSexy: '',
    userHasJoin: '没参加过',
    userSelf: '自愿',
    userAddress: '',
    userHealth: '健康',
    userHeight: '',
    userIDNo: '',
    userTel: '',
    userMobile: '',
    userProject: '',
    userRemark: ''

  },
  onLoad() {
    let that = this;
    let regInfo = null;
    that._getData(wx.getStorageSync('openid'))
      .then(res => {
        if (res) {
          wx.setStorage({
            key: 'regInfo',
            data: res,
          });
          that.setData({
            btnDisable: true,
            btnShowMyinfo: true
          });
          wx.showModal({
            showCancel: false,
            title: '您已提交过登记表',
            content: '如需修改信息请及时联系客堂',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/registerPreview/registerPreview'
                });
              }
            }
          })
        } else {
          wx.getUserInfo({
            withCredentials: false,
            success: function (res) {
              that.setData({
                userName: res.userInfo.nickName
              });
              if (res.userInfo.gender == 1) {
                that.setData({
                  'sexyOptions[0].checked': true,
                  userSexy: '男'
                });
              } else {
                that.setData({
                  'sexyOptions[1].checked': true,
                  userSexy: '女'
                });
              }
            }
          })
        }
      });
  },
  nameInput(e) {
    this.setData({
      userName: e.detail.value
    });
  },
  dharmaNameInput(e) {
    this.setData({
      userDharmaName: e.detail.value
    });
  },
  ageInput(e) {
    this.setData({
      userAge: e.detail.value
    });
  },
  nationInput(e) {
    this.setData({
      userNation: e.detail.value
    });
  },
  radioChange: function (e) {
    var radioItems = this.data.sexyOptions;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    this.setData({
      sexyOptions: radioItems,
      userSexy: e.detail.value
    });
  },
  bindCollegeChange(e) {
    this.setData({
      collegeIndex: e.detail.value,
      userCollege: this.data.collegeOptions[e.detail.value]
    })
  },
  bindHealthChange(e) {
    this.setData({
      healthIndex: e.detail.value,
      userHealth: this.data.healthOptions[e.detail.value]
    })
  },
  heightInput(e) {
    this.setData({
      userHeight: e.detail.value
    });
  },
  userIDNoInput(e) {
    this.setData({
      userIDNo: e.detail.value
    });
  },
  hasJoinChange(e) {
    this.setData({
      userHasJoin: e.detail.value ? '参加过' : '没参加过'
    })
  },
  selfChange(e) {
    this.setData({
      userSelf: e.detail.value ? '自愿' : '非自愿'
    });
  },
  addressInput(e) {
    this.setData({
      userAddress: e.detail.value
    });
  },
  telInput(e) {
    this.setData({
      userTel: e.detail.value
    });
  },
  mobileInput(e) {
    this.setData({
      userMobile: e.detail.value
    });
  },
  projectChange(e) {
    var checkboxItems = this.data.ProjectOptions, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;
      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    this.setData({
      ProjectOptions: checkboxItems,
      userProject: e.detail.value.join(',')
    });

  },
  remarkInput(e) {
    this.setData({
      userRemark: e.detail.value
    });
  },
  showTopTips() {
    let that = this;
    console.log(this.data);
    if (!that.data.userName.trim()) {
      wx.showToast({
        title: '请填写姓名',
        icon: 'loading',
        duration: 1500
      });
      return;
    }
    if (!that.data.userMobile.trim()) {
      wx.showToast({
        title: '请填写电话',
        icon: 'loading',
        duration: 1500
      });
      return;
    }
    console.log(that.data);
    wx.showModal({
      title: '确认报名',
      content: '是否确认报名参加行脚参学活动？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          const postData = {
            "姓名": that.data.userName,
            "法号": that.data.userDharmaName,
            "性别": that.data.userSexy,
            "年龄": that.data.userAge,
            "民族": that.data.userNation,
            "学历": that.data.userCollege,
            "健康状况": that.data.userHealth,
            "身高": that.data.userHeight,
            "身份证号": that.data.userIDNo,
            "是否参加过行脚活动": that.data.userHasJoin,
            "家庭住址": that.data.userAddress,
            "是否自愿参加": that.data.userSelf,
            "手机号码": that.data.userMobile,
            "固定号码": that.data.userTel,
            "具体行程": that.data.userProject,
            "随缘备注": that.data.userRemark,
          };
          let oid = wx.getStorageSync('openid');
          if(!oid) {
            wx.showToast({
              title: '微信未登录',
              icon: 'loading',
              duration: 1500
            });
            oid = + new Date();
          }
          that._postData(oid, postData)
            .then(() => {
              wx.setStorage({
                key: 'regInfo',
                data: postData,
              });
              wx.showModal({
                showCancel: false,
                title: '成功',
                content: '您的登记信息已成功提交',
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '/pages/registerPreview/registerPreview'
                    });
                  }
                }
              })
            })

        } else {
          wx.showToast({
            title: '已取消',
            duration: 1500
          });
        }
      }
    });
  },
  showMyInfo(){
    wx.navigateTo({
      url: '/pages/registerPreview/registerPreview'
    })
  },
  _postData(key, val) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://api.wxappclub.com/put',
        data: {
          appkey: 'zj3j8biqu1jd8aucqb9hxum44htegwbg',
          type: 'xingjiaoReg',
          key: key,
          value: val
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          resolve();
        }
      })
    });
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
