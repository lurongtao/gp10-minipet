const { http } = require('../../utils/util.js')
// const regeneratorRuntime = require("regenerator-runtime")

Page({
  data: {
    latitude: '',
    longitude: '',
    markers: []
  },

  onReady() {
    this.mapContext = wx.createMapContext("map")

    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        const {latitude, longitude } = res
        this.setData({
          latitude,
          longitude
        })
      }
    })
  },

  handleMarkerTap(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.markerId,
    })
  },

  async getData() {
    let result = await http(
      'https://ik9hkddr.qcloud.la/index.php/trade/get_list',
      'GET',
      {}
    )

    this.setData({
      markers: [...this.data.markers, ...result.data.map(value => {
        return {
          iconPath: `/resources/${value.type === 'buy' ? 'buy' : 'sell'}.png`,
          id: value.id,
          latitude: value.latitude,
          longitude: value.longitude,
          width: 40,
          height: 40,
          label: {
            content: value.type,
            borderWidth: 2,
            borderColor: '#fff',
            bgColor: '#f9efd4'
          }
        }
      })]
    })
    
  },

  moveToCenter() {
    this.mapContext.moveToLocation()
  },

  onShow() {
    this.getData()
  }
})
