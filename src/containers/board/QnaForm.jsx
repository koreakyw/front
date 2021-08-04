import React, { useEffect, useState } from 'react';
import { boardService } from 'services';
import _ from 'lodash';
import FormInput from 'components/board/Input';
import Button from 'components/board/Button';

const QnaForm = (props) => {
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
      title: _.get(condition, 'title'),
      content: _.get(condition, 'content')
    };
    console.log(params);
    const res = await boardService.create('qna', params);
    // const res = [];
    setCreate(res);
  };

  const onClick = (e) => {
    console.log(e);
  };

  return (
    <div>
      문의게시판
      <FormInput id='title' type='text' onChange={handleChange} />
      <FormInput id='content' type='text' onChange={handleChange} />
      <Button variant='write' size='15' onClick={onClick}>{props.button_add_name}</Button>
    </div>
  );
};

export default QnaForm;