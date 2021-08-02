import React, { useEffect, useState } from 'react';
import { boardService } from 'services';
import SelectBox from 'components/board/SelectBox';
import _ from 'lodash';

const News = () => {
  const [list, setList] = useState({
    data: []
  }); // data는 쓰는애 setData는 넣는 애
  const [data, setData] = useState({
    data: []
  });
  const [subData, setSubData] = useState({
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
      orderBy: 'news_sort_num',
      desc: 'asc',
      ctprvn_code: _.get(condition, 'ctprvn_code'),
      sgg_code: _.get(condition, 'sgg_code')
    };
    const res = await boardService.list(params);
    setList(res);
  };

  const onSelectChange = (e) => {
    const cityCode = _.get(e, 'ctprvn_code');
    if (cityCode !== '') {
      getSigunguData(e);
    }
    loadData(e);
  };

  const onSubSelectChange = (e) => {
    loadData(e);
  };

  const getSidoData = async () => {
    const res = await boardService.landRegionList();
    setData(res);
  };

  const getSigunguData = async (condition) => {
    const params = {
      ctprvn_code: _.get(condition, 'ctprvn_code')
    };
    const res = await boardService.landRegionDetailList(params);
    setSubData(res);
  };

  return (
    <div>
      <div className='list-container'>
        뉴스게시판
        <div>
          <SelectBox id='ctprvn_code' optionName='시도 선택' data={data} onSelectChange={onSelectChange} />
          <SelectBox id='sgg_code' optionName='시군구 선택' data={subData} onSubSelectChange={onSubSelectChange} />
        </div>
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
              list.data && list.data.map((item, i) => {
                return (
                  <tr key={i}>
                    <td><a target='_blank' rel='noreferrer' href={item.news_link}>{item.news_title}</a></td>
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