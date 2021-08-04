import React, { useEffect, useState } from 'react';
import { boardService } from 'services';
import QuillEditor from 'components/board/QuillEditor';
import { useLocation } from 'react-router-dom';

// import Quill from 'quill';
// import { useQuill } from 'react-quilljs';

const NoticeDetail = (props) => {
  const location = useLocation();
  const [detail, setDetail] = useState({
    data: {}
  });

  const [contents, setContents] = useState();

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

  const onEditorView = (e) => {
    setContents(e.value);
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

  return (
    <div>
      공지게시판
      <label>{detail.data.notice_title}</label>
      <label>{detail.data.read_num}</label>
      <label>{detail.data.reg_user_id}</label>
      <button id='notice_form_view'>수정</button>
      <button id='delete_notice' onClick={deleteNotice}>삭제</button>
      <button id='copy' onClick={onClickCopy}>URL복사</button>
      <QuillEditor
        theme='bubble'
        id='notice_content'
        value={contents}
        onChange={onEditorView}
        readOnly
      />
    </div>
  );
};

export default NoticeDetail;