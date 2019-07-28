const { http } = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keywords: '',
    list: [],
    storages: []
  },

  handleInputChange(e) {
    this.setData({
      keywords: e.detail.value
    })
  },

  handleItemTap(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id,
    })
  },

  async handleSearch() {
    let result = await http(
      "https://ik9hkddr.qcloud.la/index.php/trade/get_search_list",
      "POST",
      {
        keyword: this.data.keywords
      }
    )

    this.setData({
      list: result.data
    })

    let res = wx.getStorageSync('searchHistory')
    if(!!res) {
      this.setData({
        storages: [...new Set([...JSON.parse(res), this.data.keywords])]
      })
    }

    wx.setStorage({
      key: "searchHistory",
      data: this.data.storages.length > 0 ? JSON.stringify(this.data.storages) : JSON.stringify([this.data.keywords])
    })

  },

  onLoad() {
    let res = wx.getStorageSync('searchHistory')

    this.setData({
      storages: !!res ? JSON.parse(res) : []
    })
  },

  async handleHistoryItemTap(e) {
    let result = await http(
      "https://ik9hkddr.qcloud.la/index.php/trade/get_search_list",
      "POST",
      {
        keyword: e.currentTarget.dataset.text
      }
    )

    this.setData({
      list: result.data
    })
  }
})