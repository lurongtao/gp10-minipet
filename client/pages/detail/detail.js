const { http } = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    type: '',
    message: '',
    contact: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    console.log(options)
    let result = await http(
      'https://ik9hkddr.qcloud.la/index.php/trade/get_item',
      'POST',
      {
        id: options.id
      }
    )

    let {
      address,
      type,
      message,
      contact
    } = result.data

    this.setData({
      address,
      type,
      message,
      contact
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  handleButtonTap() {
    wx.navigateBack({})
  }
})