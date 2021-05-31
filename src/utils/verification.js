// 表单验证自定义规则

// 手机号
function checkMobile (rule, value, callback) {
  const mobileReg = /^[1][3,4,5,7,8][0-9]{9}$/
  if (mobileReg.test(value)) return callback()
  callback(new Error('请输入合法的手机号'))
}
// 邮箱
function checkEmail (rule, value, callback) {
  const emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
  if (emailReg.test(value)) return callback()
  callback(new Error('请输入合法的邮箱'))
}

export { checkMobile, checkEmail }
