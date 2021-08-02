import React, { useEffect, useState, useRef } from 'react';
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

  const ctprvnCode = useRef();

  // const [searchParams, setSearchParams] = useState();

  useEffect(() => {
    loadData();
    getSidoData();
  }, []);

  const loadData = async (ctprvn_code = '', sgg_code = '') => {
    const params = {
      type: 'news',
      page: 1,
      orderBy: 'news_sort_num',
      desc: 'asc',
      ctprvn_code,
      sgg_code
      // ctprvn_code: _.get(condition, 'ctprvn_code'),
      // sgg_code: _.get(condition, 'sgg_code')
    };
    const res = await boardService.list(params);
    setList(res);
  };

  const onSelectChange = (selected) => {
    if (selected.id === 'ctprvn_code') {
      ctprvnCode.current = selected.ctprvn_code; // 첫번째 셀렉트 선택시 값을 넣어놓는다
      getSigunguData(selected);
    }
    loadData(ctprvnCode.current, selected.sgg_code);
    // console.log('onSelectChange', e);
    // const cityCode = _.get(e, 'ctprvn_code');
    // const sggCode = _.get(e, 'sgg_code');
    // if (cityCode !== undefined && cityCode !== '') {
    //   console.log('이거는 선택');
    //   const mainParam = {
    //     ctprvn_code: cityCode,
    //     sgg_code: ''
    //   };
    //   setSearchParams({
    //     ...searchParams, ...mainParam
    //   });
    //   console.log('searchParams:', searchParams);
    //   getSigunguData(e);
    // }
    // if (cityCode === '') {
    //   // 초기화 시켜야함. select id : sgg_code
    // }
    // if (sggCode !== undefined && sggCode !== '') {
    //   console.log('하위 select');
    //   const subParam = {
    //     sgg_code: sggCode
    //   };
    //   setSearchParams({
    //     ...searchParams, ...subParam
    //   });
    // }
    // loadData();
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
          <SelectBox id='ctprvn_code' optionName='시도 선택' data={_.get(data, 'data')} onSelectChange={onSelectChange} />
          <SelectBox id='sgg_code' optionName='시군구 선택' data={_.get(subData, 'data')} onSelectChange={onSelectChange} />
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