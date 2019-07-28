Page({

  data: {
    address: "点击选择，要勾选哦～",
    success: false
  },

  staticData: {
    type: "buy"
  },

  handleAddressClick() {
    wx.chooseLocation({
      success: this.handleChooseLocationSucc.bind(this)
    })
  },

  handleChooseLocationSucc(res) {
    this.setData({
      address: res.address
    });
    Object.assign(this.staticData, {
      latitude: res.latitude,
      longitude: res.longitude
    })
  },

  handleTypeChange(e) {
    this.staticData.type = e.detail.value;
  },

  handleContactChange(e){
    this.staticData.contact = e.detail.value;
  },

  handleMessageChange(e) {
    this.staticData.message = e.detail.value;
  },

  handleSubmit() {
    if (this.data.address === "点击选择，要勾选哦～" || !this.data.address) {
      wx.showToast({
        title: '请填写地址',
        icon: 'loading',
        duration: 2000
      })
      return;
    }
    if(!this.staticData.message) {
      wx.showToast({
        title: '请填写说明信息',
        icon: 'loading',
        duration: 2000
      })
      return;
    }
    if (!this.staticData.contact) {
      wx.showToast({
        title: '请填写联系人信息',
        icon: 'loading',
        duration: 2000
      })
      return;
    }

    const data = Object.assign({}, this.staticData, {
      address: this.data.address,
      distinct: "longxiaozhai_cource"
    })

    wx.request({
      url: 'https://nuanwan.wekeji.cn/student/index.php/trade/add_item',
      data: data,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success: this.handleSubmitSucc.bind(this)
    })
  },

  handleSubmitSucc(res){
    if(res.data && res.data.ret){
      this.setData({
        success: true
      })
    }
  },

  handleBackTap() {
    wx.navigateBack();
  }
})
