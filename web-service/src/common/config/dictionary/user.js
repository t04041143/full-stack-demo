module.exports = {
  identification: {
    type: {
      username: 1,
      mobile: 2,
      email: 3,
      weixin: 4
    }
  },
  certificate: {
    type: {
      idCard: 1
    }
  },
  status: {
    deleted: 0,
    active: 1,
    locked: 2
  },
  gender: {
    male: 1,
    female: 2,
    other: 0
  }
};
