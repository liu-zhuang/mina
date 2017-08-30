//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    showTopTips: false,
    msg: '',
    sexyOptions: [
      { name: '男', value: '男', checked: false },
      { name: '女', value: '女', checked: false },],
    collegeOptions: ['博士', '硕士', '本科', '大专', '中专和中技', '高中', '初中', '小学', '其他'],
    collegeIndex: 0,
    healthOptions: ['健康', '有重大疾病'],
    healthIndex: 0,
    ProjectOptions: [
      { name: '殿堂值班、写缘登记', value: '殿堂值班、写缘登记', checked: false },
      { name: '厨房帮手、整理客房', value: '厨房帮手、整理客房', checked: false },
      { name: '法会布置、宾客接待', value: '法会布置、宾客接待', checked: false },
      { name: '清洁打扫、环境整治', value: '清洁打扫、环境整治', checked: false },
      { name: '物品保管、登记造册', value: '物品保管、登记造册', checked: false },
      { name: '观察疏导、安全防范', value: '观察疏导、安全防范', checked: false },
      { name: '水电维修、简单保养', value: '水电维修、简单保养', checked: false },
      { name: '其他特长', value: '其他特长', checked: false },
    ],
    rateOptions: ['长期义工(可随时根据安排来寺)', '短期义工(香期或法会可来寺)'],
    rateIndex: 0,
    weekOptions: [
      { name: '周一', value: '周一', checked: false },
      { name: '周二', value: '周二', checked: false },
      { name: '周三', value: '周三', checked: false },
      { name: '周四', value: '周四', checked: false },
      { name: '周五', value: '周五', checked: false },
      { name: '周六', value: '周六', checked: false },
      { name: '周日', value: '周日', checked: false },
    ],
    userCollege: '',
    userName: '',
    userAge: '',
    userBirthday: '',
    userNation: '',
    userBirthPlace: '',
    userSexy: '',
    userSupport: '支持',
    userBelieve: '未皈依',
    userAddress: '',
    userHealth: '',
    userTel: '',
    userWx: '',
    userProject: '',
    userRate: '',
    userWeek: ''

  },
  onLoad() {
    let that = this;
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
  },
  nameInput(e) {
    this.setData({
      userName: e.detail.value
    });
  },
  ageInput(e) {
    this.setData({
      userAge: e.detail.value
    });
  },
  birthdayInput(e) {
    this.setData({
      userBirthday: e.detail.value
    });
  },
  nationInput(e) {
    this.setData({
      userNation: e.detail.value
    });
  },
  birthPlaceInput(e) {
    this.setData({
      userBirthPlace: e.detail.value
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
  SupportChange(e) {
    this.setData({
      userSupport: e.detail.value ? '支持' : '不支持'
    })
  },
  BelieveChange(e) {
    this.setData({
      userBelieve: e.detail.value ? '皈依' : '未皈依'
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
  wxInput(e) {
    this.setData({
      userWx: e.detail.value
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
  bindRateChange(e) {
    this.setData({
      rateIndex: e.detail.value,
      userRate: this.data.rateOptions[e.detail.value]
    })
  },
  weekChange(e) {
    var checkboxItems = this.data.weekOptions, values = e.detail.value;
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
      weekOptions: checkboxItems,
      userWeek: e.detail.value.join(',')
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
    if (!that.data.userTel.trim()) {
      wx.showToast({
        title: '请填写电话',
        icon: 'loading',
        duration: 1500
      });
      return;
    }
    wx.showModal({
      title: '确认报名',
      content: '是否确认报名参加宁国禅寺义工？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          let tableID = 859;
          let data = that.data;
          let objects = {
            tableID,
            data
          };
          wx.BaaS.createRecord(objects).then((res) => {
            // success
            console.log(res);
            wx.showToast({
              title: '报名成功！',
              duration: 2000
            })
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/info/info',
              });
            }, 2000)
          }, (err) => {
            // err
          });
        } else {
          wx.showToast({
            title: '已取消',
            duration: 1500
          });
        }
      }
    });
  }
})
