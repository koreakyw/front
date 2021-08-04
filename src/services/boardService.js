import api from 'services';

const boardService = {
  landRegionList: () => {
    return api({
      method: 'get',
      url: 'board/region/list'
    }).then(res => {
      return res.data;
    });
  },
  landRegionDetailList: (ctprvnCode) => {
    return api({
      method: 'get',
      url: `board/region/detail/${ctprvnCode}`
    }).then(res => {
      return res.data;
    });
  },
  list: (type, params) => {
    return api({
      method: 'get',
      url: `board/${type}/list`,
      params
    }).then(res => {
      return res.data;
    });
  },
  detail: (type, idx) => {
    return api({
      method: 'get',
      url: `board/${type}/detail/${idx}`
    }).then(res => {
      return res.data;
    });
  },
  create: (type, params) => {
    return api({
      method: 'post',
      url: `board/${type}/create`,
      params
    }).then(res => {
      return res.data;
    });
  },
  modify: (type, idx, params) => {
    return api({
      method: 'put',
      url: `board/${type}/${idx}`,
      params
    }).then(res => {
      return res.data;
    });
  },
  delete: (type, idx) => {
    return api({
      method: 'delete',
      url: `board/${type}/${idx}`
    }).then(res => {
      return res.data;
    });
  },
  replyCreate: (type, params) => {
    return api({
      method: 'post',
      url: `board/${type}/reply/create`,
      params
    }).then(res => {
      return res.data;
    });
  },
  replyDelete: (type, idx, params) => {
    return api({
      method: 'delete',
      url: `board/${type}/reply/${idx}`,
      params
    }).then(res => {
      return res.data;
    });
  }
};

export default boardService;