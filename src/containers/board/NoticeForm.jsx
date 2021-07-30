import React, { useEffect, useState } from 'react';
// import { boardService } from 'services';
import _ from 'lodash';
import FormInput from 'components/board/Input';
import Button from 'components/board/Button';

const NoticeForm = (props) => {
  const [create, setCreate] = useState({
    data: {}
  });

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    console.log(e);
    const obj = {
      // [e.target.id]: e.target.value
    };
    // console.log(obj);
    setCreate({
      ...create, ...obj
    });
  };

  const loadData = async (condition) => {
    const params = {
      type: 'notice',
      notice_title: _.get(condition, 'notice_title'),
      notice_content: _.get(condition, 'notice_content')
    };
    console.log(params);
    // const res = await boardService.create(params);
    const res = [];
    setCreate(res);
  };

  const onClick = (e) => {
    console.log(e);
  };

  return (
    <div>
      공지게시판
      <FormInput id='notice_title' type='text' onChange={handleChange} />
      <FormInput id='notice_content' type='text' onChange={handleChange} />
      <Button variant='write' size='15' onClick={onClick}>{props.button_add_name}</Button>
    </div>
  );
};

export default NoticeForm;