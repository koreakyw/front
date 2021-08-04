import React, { useEffect, useState } from 'react';
import { boardService } from 'services';
import _ from 'lodash';
import FormInput from 'components/board/Input';
import Button from 'components/board/Button';
import QuillEditor from 'components/board/QuillEditor';

const NoticeForm = (props) => {
  const [params, setParams] = useState({
    data: {}
  });
  const [text, setText] = useState('');
  const [inputText, setInputText] = useState('');
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    if (props.mode === 'edit') {
      setInputText(props.data.notice_title);
      setText(props.data.notice_content);
    }
  };

  // console.log(setParams);
  const handleChange = (e) => {
    const obj = {
      id: e.id,
      [e.id]: e.value
    };
    setParams({
      ...params, ...obj
    });
    setInputText(e.value);
  };

  const noticeCreate = async (condition) => {
    const params = {
      type: 'notice',
      notice_title: _.get(condition, 'notice_title'),
      notice_content: _.get(condition, 'notice_content')
    };
    const res = await boardService.create(params);
    console.log(res.alertMessage); // 이거는 alert 띄우고 리스트로 페이지 돌리는 방법 필요.
  };

  const noticeModify = async (condition) => {
    const params = {
      type: 'notice',
      idx: props.idx,
      notice_title: _.get(condition, 'notice_title'),
      notice_content: _.get(condition, 'notice_content')
    };
    const res = await boardService.modify(params);
    console.log(res.alertMessage); // 이거는 alert 띄우고 리스트로 페이지 돌리는 방법 필요.
  };

  const onClick = (e) => {
    if (props.mode === 'edit') {
      noticeModify(params);
    } else {
      noticeCreate(params);
    }
  };

  const editorHandleChange = (e) => {
    setText(e.text);
    const obj = {
      id: e.id,
      [e.id]: e.value
    };
    setParams({
      ...params, ...obj
    });
  };

  return (
    <div>
      공지게시판
      <FormInput id='notice_title' type='text' value={inputText} className='inputClass' onChange={handleChange} />
      <div className='editor'>
        <QuillEditor id='notice_content' theme='snow' value={text} className='inputClass' readOnly={false} onChange={editorHandleChange} />
      </div>
      <Button variant='write' size='15' onClick={onClick}>{props.button_add_name}</Button>
    </div>
  );
};

export default NoticeForm;