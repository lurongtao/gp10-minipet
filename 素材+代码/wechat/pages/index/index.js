const app = getApp();

Page({

  data: {
    longitude: "",
    latitude: "",
    markers: [],
    controls: [{
      iconPath: '/resources/pin.png',
      position: {
        left: (app.globalData.windowWidth / 2) - 11,
        top: ((app.globalData.windowHeight -40) / 2) - 31,
        width: 22,
        height: 31
      }
    }, {
      id: 1,
      iconPath: '/resources/center.png',
      position: {
        left: 20,
        top: app.globalData.windowHeight - 90,
        width: 30,
        height: 30
      },
      clickable: true
    }]
  },

  onShow(){
    this.getLocation();
    this.getMessages();
  },

  getMessages(){
    wx.request({
      url: 'https://nuanwan.wekeji.cn/student/index.php/trade/get_list', 
      data: {
        distinct: app.globalData.distinct
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: this.getMessagesSucc.bind(this)
    })
  },

  getMessagesSucc(res){
    const data = res.data.data;
    const markers = data.map((value, index)=> {
      return {
        iconPath: "/resources/" + value.type +".png",
        id: value.id,
        latitude: value.latitude,
        longitude: value.longitude,
        width: 40,
        height: 40
      }
    });
    this.setData({
      markers: markers
    })
  },

  onReady(){
    this.mapCtx = wx.createMapContext('map');
  },

  getLocation(){
    wx.getLocation({
      type: 'gcj02',
      success: this.handleGetLocationSucc.bind(this)
    })
  },

  handleGetLocationSucc(res){
    this.setData({
      longitude: res.longitude,
      latitude: res.latitude
    })
  },

  controltap() {
    this.mapCtx.moveToLocation();
  },

  onShareAppMessage() {
    return {
      title: '萌宠交易平台',
      path: '/pages/index/index'
    }
  },

  handleMarkerTap(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.markerId
    })
  }
})
