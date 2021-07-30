import React, { useEffect, useState } from 'react';
import { boardService } from 'services';
import Search from 'components/board/Search';
import _ from 'lodash';

const DailyNews = () => {
  const [list, setList] = useState({
    data: []
  }); // data는 쓰는애 setData는 넣는 애

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (condition) => {
    const params = {
      type: 'daily_news',
      page: 1,
      orderBy: 'reg_date',
      search_content: _.get(condition, 'search_content'),
      day_search: _.get(condition, 'day_search'),
      context_search: _.get(condition, 'context_search')
    };
    const res = await boardService.list(params);
    setList(res);
  };

  return (
    <div>
      <div className='list-container'>
        데일리뉴스
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
                  <tr key={i}>
                    <td>{item.news_title}</td>
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
    </div>
  );
};

export default DailyNews;