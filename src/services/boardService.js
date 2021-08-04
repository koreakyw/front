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
  landRegionDetailList: (param) => {
    return api({
      method: 'get',
      url: `board/region/detail/${param.ctprvn_code}`
    }).then(res => {
      return res.data;
    });
  },
  list: (params) => {
    return api({
      method: 'get',
      url: `board/${params.type}/list`,
      params
    }).then(res => {
      return res.data;
    });
  },
  detail: (params) => {
    return api({
      method: 'get',
      url: `board/${params.type}/detail/${params.idx}`,
      params
    }).then(res => {
      return res.data;
    });
  },
  create: (params) => {
    return api({
      method: 'post',
      url: `board/${params.type}/create`,
      params
    }).then(res => {
      return res.data;
    });
  },
  modify: (params) => {
    return api({
      method: 'put',
      url: `board/${params.type}/${params.idx}`,
      params
    }).then(res => {
      return res.data;
    });
  },
  delete: (params) => {
    return api({
      method: 'delete',
      url: `board/${params.type}/${params.idx}`,
      params
    }).then(res => {
      return res.data;
    });
  },
  replyCreate: (params) => {
    return api({
      method: 'post',
      url: `board/${params.type}/reply/create`,
      params
    }).then(res => {
      return res.data;
    });
  },
  replyDelete: (params) => {
    return api({
      method: 'delete',
      url: `board/${params.type}/reply/${params.idx}`,
      params
    }).then(res => {
      return res.data;
    });
  }
};

export default boardService;