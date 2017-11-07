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

const baseUrl = 'http://www.easy-mock.com/mock/59eb2b9612843d4e528c761f';

const ajax = (apiName,options,callback) => {
  return new Promise((resolve, reject) => {
    var config = {
      url: baseUrl + apiName,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        resolve(res.data)
      },
      fail: function (res) {
        // fail
        reject(res)
      }
    }

    if (options) Object.assign(config, options)

    var requestTask = wx.request(config)

    callback && callback(requestTask)
  }).catch(err => console.log(err))
}

const plus = function (num1, num2) {
  var len1, len2, m;
  try {
    len1 = num1.toString().split(".")[1].length;
  }
  catch (e) {
    len1 = 0;
  }
  try {
    len2 = num2.toString().split(".")[1].length;
  }
  catch (e) {
    len2 = 0;
  }
  m = Math.pow(10, Math.max(len1, len2));
  return (num1 * m + num2 * m) / m;
}

const multi = function (num1, num2) {
  var len1, len2, m;
  try {
    len1 = num1.toString().split(".")[1].length;
  }
  catch (e) {
    len1 = 0;
  }
  try {
    len2 = num2.toString().split(".")[1].length;
  }
  catch (e) {
    len2 = 0;
  }
  m = Math.pow(10, Math.max(len1, len2));
  return (num1 * m) * (num2 * m) / m / m;
}

const guid = function() {
  var guid = "";
  for (var i = 1; i <= 32; i++) {
    var n = Math.floor(Math.random() * 16.0).toString(16);
    guid += n;
  }
  return guid;
}

module.exports = {
  formatTime: formatTime,
  ajax: ajax,
  plus: plus,
  multi: multi,
  guid: guid
}
