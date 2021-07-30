import api from 'services';

const boardService = {
  sidoList: () => {
    return api({
      method: 'get',
      url: 'board/sido/list'
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
      url: `board/${params.type}/create`
    }).then(res => {
      return res.data;
    });
  }
};

export default boardService;