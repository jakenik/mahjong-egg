module.exports = [{
  name: 'phone',
  fn: (rule, value) => {
    if (!(/^1[3456789]\d{9}$/.test(value))) {
      return 'the format is wrong';
    }
  }
}, {
  name: 'account',
  fn: (rule, value) => {
    if (!/^[a-zA-Z0-9_-]{5,16}$/.test(value)) {
      return '由5到16位的字母或数字，下划线，减号组成';
    }
  }
}, {
  name: 'password',
  fn: (rule, value) => {
    if (!/^.*(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,30}$/.test(value)) {
      return '由大写字母和小写字母和数字组成，最少8位最大30位';
    }
  }
}];
