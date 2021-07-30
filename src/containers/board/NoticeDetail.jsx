import React, { useEffect, useState } from 'react';
import { boardService } from 'services';

const NoticeDetail = (props) => {
  const [detail, setDetail] = useState({
    data: {}
  });

  useEffect(() => {
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

  return (
    <div>
      공지게시판
      <label>{detail.data.notice_title}</label>
      <label>{detail.data.read_num}</label>
      <label>{detail.data.reg_user_id}</label>
      <button id='notice_form_view'>수정</button>
      <button id='delete_notice'>삭제</button>
      <button id='copy'>URL복사</button>
    </div>
  );
};

export default NoticeDetail;