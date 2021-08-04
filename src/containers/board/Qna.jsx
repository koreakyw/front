import React, { useEffect, useState, useRef } from 'react';
import { boardService } from 'services';
import _ from 'lodash';
import Search from 'components/board/Search';
import Button from 'components/board/Button';
import QnaDetail from 'containers/board/QnaDetail';
import QnaForm from 'containers/board/QnaForm';

const Qna = () => {
  const [pageType, setPageType] = useState();
  const [list, setList] = useState({
    data: []
  }); // data는 쓰는애 setData는 넣는 애

  const detailIdx = useRef();
  const mode = useRef();

  useEffect(() => {
    setPageType('list');
    loadData();
  }, []);

  const loadData = async (condition) => {
    const params = {
      type: 'qna',
      page: 1,
      orderBy: 'reg_date',
      search_content: _.get(condition, 'search_content'),
      day_search: _.get(condition, 'day_search'),
      context_search: _.get(condition, 'context_search')
    };
    const res = await boardService.list(params);
    setList(res);
    console.log(res.data);
  };

  const listContainer = (list = {}) => {
    return (
      <div>
        <div className='list-container'>
          문의게시판
          <table>
            <thead>
              <tr>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>조회</th>
                <th>댓글개수</th>
              </tr>
            </thead>
            <tbody>
              {
                list.data.map((item, i) => {
                  return (
                    <tr key={item.idx} onClick={() => onDetail(item.idx)}>
                      <td>{item.title}</td>
                      <td>{item.reg_user_id}</td>
                      <td>{item.reg_date}</td>
                      <td>{item.read_num}</td>
                      <td>{item.get_reply.length}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
        <Search loadData={loadData} />
        <Button variant='write' size='15' onClick={() => onForm('create')}>글쓰기</Button>
      </div>
    );
  };

  const onDetail = (idx) => {
    detailIdx.current = idx;
    setPageType('detail');
  };

  const onForm = (type) => {
    mode.current = type;
    setPageType('form');
  };

  const generateDom = (type, list) => {
    let Container = null;
    switch (type) {
      case 'detail':
        Container = <QnaDetail idx={detailIdx.current} />;
        break;
      case 'form':
        Container = <QnaForm mode={mode.current} button_add_name='등록' />;
        break;
      default:
        Container = listContainer(list);
        break;
    }
    return Container;
  };

  return (
    <>
      {generateDom(pageType, list)}
    </>
  );
};

export default Qna;