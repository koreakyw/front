import React, { useEffect, useState, useRef } from 'react';
import { boardService } from 'services';
import QuillEditor from 'components/board/QuillEditor';
import { useLocation } from 'react-router-dom';
import NoticeForm from 'containers/board/NoticeForm';

const NoticeDetail = (props) => {
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
      type: 'notice',
      idx: props.idx
    };
    const res = await boardService.detail(params);
    setDetail(res);
  };

  const detailContainer = (detail = {}) => {
    console.log(detail.data);
    return (
      <div>
        공지게시판
        <label>{detail.data.notice_title}</label>
        <label>{detail.data.read_num}</label>
        <label>{detail.data.reg_user_id}</label>
        <button id='notice_form_view' onClick={() => modifyForm(props.idx)}>수정</button>
        <button id='delete_notice' onClick={deleteNotice}>삭제</button>
        <button id='copy' onClick={onClickCopy}>URL복사</button>
        <QuillEditor
          theme='bubble'
          id='notice_content'
          value={detail.data.notice_content ?? ''}
          readOnly
        />
      </div>
    );
  };

  const deleteNotice = async () => {
    const params = {
      type: 'notice',
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

  const generateDom = (type, detail) => {
    let Container = null;
    switch (type) {
      case 'modify':
        Container = <NoticeForm mode={mode.current} button_add_name='수정' />;
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

export default NoticeDetail;