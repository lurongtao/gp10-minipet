const app = getApp();
const header = require('../../components/header/header.js');

const data = Object.assign({}, header.data, {
  address: "",
  type: "",
  message: "",
  contact: ""
});


const config = Object.assign({},header , {

  data: data,

  onLoad(options) {
    this.getDetailInfo(options.id);
  },

  getDetailInfo(id) {
    wx.request({
      url: 'https://nuanwan.wekeji.cn/student/index.php/trade/get_item',
      data: {
        distinct: app.globalData.distinct,
        id: id
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: this.getDetailSucc.bind(this)
    })
  },

  getDetailSucc(res) {
    const result = res.data.data;
    this.setData({
      address: result.address,
      type: result.type,
      message: result.message,
      contact: result.contact
    })
  }
})

Page(config)