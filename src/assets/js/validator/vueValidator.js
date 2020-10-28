/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
function Validator() {
  // 验证器
  this.cache = []; // 缓存
}
Validator.prototype.strategies = {
  // 策略
  isNotEmpty(value, errorMsg) {
    // 非空    注意： 数字0 == "" 为true  而字符串0或者使用===则为false
    if (value === '' || value == null) {
      return errorMsg; // 输入检测目标及对应报错信息，如果通过则返回true，否则返回错误信息
    }
    return true;
  },
  maxLength(value, length, errorMsg) {
    // 最大长度
    // console.log(value, +length, errorMsg, 'value, length, errorMsg', value.length > +length);
    if (value !== '' && value.length > +length) {
      return errorMsg;
    }
    return true;
  },
  minLength(value, length, errorMsg) {
    // 最小长度
    if (value !== '' && value.length < +length) {
      return errorMsg;
    }
    return true;
  },
  shouldLength(value, length, errorMsg) {
    // 应该有的长度
    if (value !== '' && value.length !== +length) {
      return errorMsg;
    }
    return true;
  },
  isEmail(value, errorMsg) {
    if (value !== '' && value.indexOf('@') === -1) {
      return errorMsg;
    }
    return true;
  },
  isPhone(value, errorMsg) {
    // 手机号码验证  需要配合非空一起使用
    if (value !== '' && !/^1[3456789]\d{9}$/.test(value)) {
      return errorMsg;
    }
    return true;
  },
  isPassword(value, errorMsg) {
    // 密码验证：非空 + 最小长度 + 最大长度  => 应该分开写   此处策略虽写出不启用(且不完整)
    if (value.length < 6 && value.length > 16) {
      return errorMsg;
    }
    return true;
  },
  isNotZero: (value, errorMsg) => {
    // 非零
    if (value === 0) {
      return errorMsg;
    }
    return true;
  },
  hasNotSpace: (value, errorMsg) => {
    // 不能有空格
    if (value.includes(' ')) {
      return errorMsg;
    }
    return true;
  },
  hasNotRung: (value, errorMsg) => {
    // 不能有 横杠
    if (value.includes('-')) {
      return errorMsg;
    }
    return true;
  },
  Maximum(value, maxNum, errorMsg) { // 最大值验证
    if (+value > +maxNum) return errorMsg;
    return true;
  },
  Minimum(value, minNum, errorMsg) { // 最小值验证
    if (+value < +minNum) return errorMsg;
    return true;
  },
  isNotNum(value, errorMsg) { // 必须为数字
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(value)) return errorMsg;
    return true;
  },
  isMultiple(value, Multiple, errorMsg) { // 倍数验证
    if (+value % +Multiple !== 0) return errorMsg;
    return true;
  },
  isPositiveInt(value, errorMsg) { // 必须为正整数
    if (!/(^[1-9]\d*$)/.test(value)) return errorMsg;
    return true;
  },
  equalValue(value, equalValue, errorMsg) {
    console.log(equalValue);
    if (`${value}` !== `${equalValue}`) return errorMsg;
    return true;
  },
};

Validator.prototype.add = function (value, rules) {
  // 增加策咯执行元素，需要内容：被检测dom元素 展示错误信息dom元素 策咯数组
  const self = this; // 存放this值，方便后续取用
  rules.forEach((rule) => {
    // 遍历策咯数组
    self.cache.push(() => {
      // console.log(rule.strategy);
      const arr = rule.strategy.split(':'); // arr => ['isNonEmpty'] ['maxLength', '4'];
      const type = arr.shift(); // type => isNonEmpty    maxLength     arr => []  ['4']
      arr.unshift(value); // [value] [value, '4']
      arr.push(rule.errorMsg); // [dom.value, errorMsg] [dom.value, '4', errorMsg]
      // console.log(arr, type, '-----------arr', self.strategies[type]);
      return self.strategies[type].apply(self, arr);
    });
  });
};

Validator.prototype.start = function () {
  // 标记最后是否能符合规则
  // console.log(this.cache);
  let msg = true;
  for (let i = 0; i < this.cache.length; i += 1) {
    msg = this.cache[i]();
    if (msg !== true) return msg;
  }
  return msg;
};

Validator.prototype.extend = function (config) {
  // 扩展策咯条目
  // eslint-disable-next-line guard-for-in
  for (const prop in config) {
    Validator.prototype.strategies[prop] = config[prop];
  }
};

export default Validator;

