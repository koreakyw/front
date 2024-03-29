import React, { useEffect, useState, useRef } from 'react';
// import { boardService } from 'services';
import _ from 'lodash';
// import Search from 'components/board/Search';
import Button from 'components/board/Button';
import FormInput from 'components/board/Input';
// import Paginations from 'components/board/Pagination';
// import '../../App.css';
import SelectBox from 'components/board/SelectBox';

const House = () => {
  const [pageType, setPageType] = useState();
  const [list, setList] = useState({
    data: []
  });

  const [data, setData] = useState({
    data: []
  });
  const [sigunguData, setSigunguData] = useState({
    data: []
  });
  const [dongData, setDongData] = useState({
    data: []
  });

  console.log(setData);
  console.log(setSigunguData);
  console.log(setDongData);

  const ref = useRef();
  console.log(ref);

  useEffect(() => {
    setPageType('list');
    loadData();
  }, []);

  const loadData = () => {
    console.log(1);
    setList([]);
  };

  const onSearch = (type) => {
    console.log('type:', type);
  };

  const onSelectChange = (selected) => {
    console.log(selected);
  };

  const listContainer = (list = {}) => {
    return (
      <div id='direct_wrap'>
        <div className='direct_inner'>
          <div className='direct_main'>
            <div className='direct_main_inner'>
              <div className='direct_tit'>
                <h2>아파트 직거래</h2>
                <h3>어떤 아파트를 찾고 계신가요?</h3>
              </div>
              <div className='direct_search_area'>
                <ul className='deal_type' id='deal_type'>
                  <li className='active' onClick={() => onSearch('A')} value='A'>전체</li>
                  <li onClick={() => onSearch('D')} value='D'>매매</li>
                  <li onClick={() => onSearch('L')} value='L'>전세</li>
                  <li onClick={() => onSearch('R')} value='R'>월세</li>
                </ul>
                <div className='search_wrap'>
                  <div className='search_inner'>
                    <div className='filter_location'>
                      <p className='filter_tit'>지역</p>
                      {/* <select id='ctprvn_code' name='ctprvn_code'>
                        <option value=''>시도 선택</option>
                        <option value='11'>서울시</option>
                        <option value='26'>부산시</option>
                        <option value='27'>대구시</option>
                        <option value='28'>인천시</option>
                        <option value='29'>광주시</option>
                        <option value='30'>대전시</option>
                        <option value='31'>울산시</option>
                        <option value='36'>세종시</option>
                        <option value='41'>경기도</option>
                        <option value='42'>강원도</option>
                        <option value='43'>충청북도</option>
                        <option value='44'>충청남도</option>
                        <option value='45'>전라북도</option>
                        <option value='46'>전라남도</option>
                        <option value='47'>경상북도</option>
                        <option value='48'>경상남도</option>
                        <option value='50'>제주특별자치도</option>
                      </select>
                      <select name='sgg_code' id='sgg_code'>
                        <option value=''>시군구 선택</option>
                      </select>
                      <select name='emd_code' id='emd_code'>
                        <option value=''>읍/면/동</option>
                      </select> */}
                      <SelectBox id='ctprvn_code' optionName='시도 선택' data={_.get(data, 'data')} onSelectChange={onSelectChange} />
                      <SelectBox id='sgg_code' optionName='시군구 선택' data={_.get(sigunguData, 'data')} onSelectChange={onSelectChange} />
                      <SelectBox id='sgg_code' optionName='시군구 선택' data={_.get(dongData, 'data')} onSelectChange={onSelectChange} />
                    </div>
                    <div className='filter_apt_name'>
                      <p className='filter_tit'>아파트명</p>
                      {/* <input type='text' name='stx' id='stx' placeholder='아파트명을 검색해보세요.' value='' /> */}
                      <FormInput type='text' id='stx' placeholder='아파트명을 검색해보세요.' />
                    </div>
                    {/* <div className='search_btn' onClick='javascript:articleSearch();'>검색</div> */}
                    <Button variant='submit' size='15' onClick={onSearch}>검색</Button>
                  </div>
                </div>
              </div>
              <div className='direct_apt_img'>이미지</div>
              <div className='direct_square'>슈가</div>
            </div>
          </div>
          <div className='apt_list' id='apt_list'>아파트리스트</div>
        </div>
      </div>
    );
  };

  const generateDom = (type, list) => {
    let Container = null;
    switch (type) {
      // case 'detail':
      //   Container = <NoticeDetail idx={detailIdx.current} />;
      //   break;
      // case 'form':
      //   Container = <NoticeForm mode={mode.current} button_add_name='등록' />;
      //   break;
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

export default House;