Page({
  data: {
    latitude: '',
    longitude: ''
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


  moveToCenter() {
    this.mapContext.moveToLocation()
  }
})
