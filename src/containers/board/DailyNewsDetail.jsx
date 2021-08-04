import React, { useEffect, useState, useRef } from 'react';
import { boardService } from 'services';
import QuillEditor from 'components/board/QuillEditor';
import { useLocation } from 'react-router-dom';
import DailyNewsForm from 'containers/board/DailyNewsForm';

const DailyNewsDetail = (props) => {
  const [pageType, setPageType] = useState();
  const location = useLocation();
  const mode = useRef();
  const [detail, setDetail] = useState({
    data: {}
  });

  useEffect(() => {
    setPageType('detail');
    loadData();
  }, []);

  const loadData = async () => {
    const params = {
      type: 'daily_news',
      idx: props.idx
    };
    const res = await boardService.detail(params);
    setDetail(res);
  };

  const dailyNewsDelete = async () => {
    const params = {
      type: 'daily_news',
      idx: props.idx
    };
    const res = await boardService.delete(params);
    console.log(res.alertMessage);
  };

  const onClickCopy = () => {
    console.log('copy');
    console.log(location.pathname); // 해당 Path로는 바로 들어 갈 방법이 없음.
  };

  const modifyForm = () => {
    mode.current = 'edit';
    setPageType('modify');
  };

  const detailContainer = (detail = {}) => {
    return (
      <div>
        데일리뉴스
        <label>{detail.data.news_title}</label>
        <br />
        <label>{detail.data.reg_user_id}</label>
        <br />
        <label>{detail.data.reg_date} 조회 {detail.data.read_num}</label>
        <button id='dailyNews_form_view' onClick={() => modifyForm(props.idx)}>수정</button>
        <button id='dailyNews_delete' onClick={dailyNewsDelete}>삭제</button>
        <button id='copy' onClick={onClickCopy}>URL복사</button>
        <QuillEditor
          theme='bubble'
          id='news_content'
          value={detail.data.news_content ?? ''}
          readOnly
        />
      </div>
    );
  };

  const generateDom = (type, detail) => {
    let Container = null;
    switch (type) {
      case 'modify':
        Container = <DailyNewsForm mode={mode.current} idx={props.idx} data={detail.data} button_add_name='수정' />;
        break;
      default:
        Container = detailContainer(detail);
        break;
    }
    return Container;
  };

  return (
    <>
      {generateDom(pageType, detail)}
    </>
  );
};

export default DailyNewsDetail;