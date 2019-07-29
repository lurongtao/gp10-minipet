Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isSucc: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSuccBackTap() {
      wx.navigateBack({})
    },

    handleFailBackTap() {
      this.setData({
        isSubmit: false
      })
    }
  }
})
