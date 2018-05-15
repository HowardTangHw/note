module.exports = {
  register: async (name, pwd) => {
    let data = '账号信息错误';
    if (name == 'abc' && pwd == '123') {
      data = `hellow,${name}`;
    }
    return data;
  },
};
