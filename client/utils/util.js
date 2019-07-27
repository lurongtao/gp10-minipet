const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    })
}

var http = (url, method, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url, //仅为示例，并非真实的接口地址
      data,
      method,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: (res) => {
        resolve(res.data)
      }
    })
  })
}

module.exports = { formatTime, showBusy, showSuccess, showModel, http }
