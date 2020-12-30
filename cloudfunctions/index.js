const cloud = require('wx-server-sdk')
exports.main = (event,context)=>{
  let {userInfo,a,b} = event
  let {OPENID,APPID} = cloud.getWXContext()
  let sum = a + b
  return {
    OPENID,
    APPID,
    sum
  }
}