import React, { useEffect, useState, useRef } from 'react';
import { boardService } from 'services';
import _ from 'lodash';
import Search from 'components/board/Search';
import Button from 'components/board/Button';
import NoticeDetail from 'containers/board/NoticeDetail';
import NoticeForm from 'containers/board/NoticeForm';
import Paginations from 'components/board/Pagination';

const Notice = () => {
  const [pageType, setPageType] = useState();
  const [list, setList] = useState({
    data: []
  });
  const detailIdx = useRef();
  const mode = useRef();

  /* 페이지네이션 */
  const [postsPerPage] = useState(1);
  // const [offset, setOffset] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  /* 페이지네이션 */

  useEffect(() => {
    setPageType('list');
    loadData();
  }, []);

  const loadData = async (condition) => {
    console.log('condition:', condition);
    const params = {
      type: 'notice',
      offset: _.get(condition, 'offset'),
      limit: _.get(condition, 'limit'),
      orderBy: 'reg_date',
      search_content: _.get(condition, 'search_content'),
      day_search: _.get(condition, 'day_search'),
      context_search: _.get(condition, 'context_search')
    };
    const res = await boardService.list(params);
    setList(res);
    setPageCount(Math.ceil(res.pageData.totalCount / postsPerPage));
  };

  const handlePageClick = (e) => {
    console.log(e);
    const selectedPage = e.selected;
    const obj = {
      offset: selectedPage,
      limit: 1
    };
    loadData(obj);
  };

  const listContainer = (list = {}) => {
    return (
      <div>
        <div className='list-container'>
          공지게시판
          <table>
            <thead>
              <tr>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>조회</th>
              </tr>
            </thead>
            <tbody>
              {
                list.data.map((item, i) => {
                  return (
                    <tr key={i} onClick={() => onDetail(item.idx)}>
                      <td>{item.notice_title}</td>
                      <td>{item.reg_user_id}</td>
                      <td>{item.reg_date}</td>
                      <td>{item.read_num}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
        <Search loadData={loadData} />
        <Button variant='write' size='15' onClick={() => onForm('create')}>글쓰기</Button>
        <div className='pagination-wrapper'>
          <Paginations
            previousLabel='prev'
            nextLabel='next'
            pageCount={pageCount}
            onPageChange={handlePageClick}
            activeClassName='active'
            containerClassName='pagination'
            subContainerClassName='pages pagination'
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
          />
        </div>
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
        Container = <NoticeDetail idx={detailIdx.current} />;
        break;
      case 'form':
        Container = <NoticeForm mode={mode.current} button_add_name='등록' />;
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

export default Notice;