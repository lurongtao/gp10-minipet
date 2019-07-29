const { http } = require('../../utils/util.js')
// const regeneratorRuntime = require("regenerator-runtime")

Page({
  data: {
    address: '点击选择，要勾选哦~',
    isSubmit: false,
    isSucc: false
  },

  onReady() {
    this.staticData = {
      type: 'buy'
    }
  },

  handleAddressTap() {
    wx.chooseLocation({
      success: (result) => {
        let {
          address,
          latitude,
          longitude
        } = result
        this.staticData = { ...this.staticData, address, latitude, longitude }
        
        this.setData({
          address
        })
      }
    })
  },

  handleMessageInput(e) {
    this.staticData.message = e.detail.value
  },

  handleContactInput(e) {
    this.staticData.contact = e.detail.value
  },

  radioChange(e) {
    this.staticData.type = e.detail.value
  },

  showValidateInfo(title) {
    wx.showToast({
      title,
      icon: 'loading',
      duration: 2000
    })
  },

  async handleButtonTap() {
    // 验证
    if (!this.staticData.address) {
      this.showValidateInfo('请选择地址')
      return
    }

    if (!this.staticData.message) {
      this.showValidateInfo('请输入说明')
      return
    }

    if (!this.staticData.contact) {
      this.showValidateInfo('请输入联系方式')
      return
    }


    let result = await http('https://ik9hkddr.qcloud.la/index.php/trade/add_item', 'POST', this.staticData)

    this.setData({
      isSubmit: true
    })

    if (result.ret) {
      this.setData({
        isSucc: true
      })
    } else {
      this.setData({
        isSucc: false,
      })
    }

  }


})