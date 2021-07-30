import React, { useState } from 'react';

const Search = (props) => {
  const { loadData } = props;
  const [searchData, setSearchData] = useState({});

  const onSearch = (e) => {
    loadData(searchData);
  };

  const onChangeSelect = (e) => {
    const obj = {
      [e.target.id]: e.target.value
    };
    setSearchData({
      ...searchData, ...obj
    });
  };

  const onChangeInput = (e) => {
    const obj = {
      [e.target.id]: e.target.value
    };
    setSearchData({
      ...searchData, ...obj
    });
  };

  return (
    <div className='condition'>
      <select id='day_search' name='day_search' className='select_design' onChange={onChangeSelect}>
        <option value=''>전체기간</option>
        <option value='1'>1일</option>
        <option value='7'>1주</option>
        <option value='30'>1개월</option>
        <option value='182'>6개월</option>
        <option value='365'>1년</option>
      </select>
      <select id='context_search' name='context_search' className='select_design' onChange={onChangeSelect}>
        <option value='1'>제목 + 내용</option>
        <option value='2'>제목만</option>
        <option value='3'>글작성자</option>
      </select>
      <input className='f_ipt_txt' id='search_content' type='text' onChange={onChangeInput} />
      <button id='search' className='search_btn' onClick={onSearch}>조회</button>
    </div>
  );
};

export default Search;