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

  // const [params, setParams] = useState();
  const [text, setText] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  // console.log(setParams);
  const handleChange = (e) => {
    const obj = {
      id: e.id,
      [e.id]: e.value
    };
    setParams({
      ...params, ...obj
    });
  };

  const loadData = async (condition) => {
    console.log('logData');
  };

  const noticeCreate = async (condition) => {
    const params = {
      type: 'notice',
      notice_title: _.get(condition, 'notice_title'),
      notice_content: _.get(condition, 'notice_content')
    };
    console.log(params);
    const res = await boardService.create(params);
    console.log(res.alertMessage); // 이거는 alert 띄우고 리스트로 페이지 돌리는 방법 필요.
  };

  const onClick = (e) => {
    console.log('create:', params);
    noticeCreate(params);
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
    // const obj = {
    //   id: e.id,
    //   [e.id]: e.value
    // };
    // console.log('obj:', obj);
    // setCreate({
    //   ...create, ...obj
    // });
  };

  return (
    <div>
      공지게시판
      <FormInput id='notice_title' type='text' className='inputClass' onChange={handleChange} />
      <div className='editor'>
        <QuillEditor id='notice_content' theme='snow' value={text} className='inputClass' onChange={editorHandleChange} />
      </div>
      <Button variant='write' size='15' onClick={onClick}>{props.button_add_name}</Button>
    </div>
  );
};

export default NoticeForm;