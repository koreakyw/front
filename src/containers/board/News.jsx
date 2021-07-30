import React, { useEffect, useState } from 'react';
import { boardService } from 'services';
import SelectBox from 'components/board/Search';
import _ from 'lodash';

const News = () => {
  const [list, setList] = useState({
    data: []
  }); // data는 쓰는애 setData는 넣는 애
  const [sidoData, setSidoData] = useState({
    data: []
  });
  const [sigunguData, setSigunguData] = useState({
    data: []
  });

  useEffect(() => {
    loadData();
    getSidoData();
  }, []);

  const loadData = async (condition) => {
    const params = {
      type: 'news',
      page: 1,
      orderBy: 'reg_date',
      search_content: _.get(condition, 'search_content'),
      day_search: _.get(condition, 'day_search'),
      context_search: _.get(condition, 'context_search')
    };
    const res = await boardService.list(params);
    console.log(res);
    setList(res);
  };

  const onSelectChange = (e) => {
    console.log(e.target.value);
    getSigunguData(e.target.value);
  };

  const getSidoData = async () => {
    const res = await boardService.list();
    setSidoData(res);
  };

  const getSigunguData = async () => {
    const res = await boardService.list();
    setSigunguData(res);
  };

  return (
    <div>
      <div className='list-container'>
        뉴스게시판
        <table>
          <div>
            <SelectBox id='ctprvn_code' data={sidoData} onSelectChange={onSelectChange} />
            <SelectBox id='sgg_code' data={sigunguData} onSelectChange={onSelectChange} />
          </div>
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
              list.data && list.data.map((item, i) => {
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
    </div>
  );
};

export default News;