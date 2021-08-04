import React, { useEffect, useState } from 'react';
import { boardService } from 'services';
import FormInput from 'components/board/Input';
import Button from 'components/board/Button';

const QnaDetail = (props) => {
  const [detail, setDetail] = useState({
    data: {}
  });
  const [create, setCreate] = useState({
    data: {}
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const params = {
      type: 'qna',
      idx: props.idx
    };
    const res = await boardService.detail(params);
    setDetail(res);
    console.log(res);
  };

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

  const onClick = (e) => {
    console.log(e);
  };

  return (
    <div>
      <div>
        문의게시판<br />
        <label>{detail.data.title}</label>
        <label>  조회 {detail.data.read_num} </label>
        <label>{detail.data.reg_user_id}</label>
        <button id='qna_form_view'>수정</button>
        <button id='delete_qna'>삭제</button><br /><br />
        <label>{detail.data.content}</label><br />
      </div>
      <div>
        댓글
        <FormInput id='title' type='text' onChange={handleChange} /><br />
        <Button variant='write' size='15' onClick={onClick}>등록</Button><br /><br />
      </div>
    </div>
  );
};

export default QnaDetail;