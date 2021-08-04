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
      [e.id]: e.value
    };
    // console.log(obj);
    setCreate({
      ...create, ...obj
    });
  };

  const onClick = async () => {
    const params = {
      type: 'qna',
      idx: props.idx,
      content: create.content
    };
    const res = await boardService.replyCreate(params);
    loadData();
    console.log(res);
  };

  const replyDelete = async (condition) => {
    console.log(condition);
    const params = {
      type: 'qna',
      idx: props.idx,
      content: condition.qna_re_content
    };
    const res = await boardService.replyDelete(params);
    loadData();
    console.log(res);
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
        <FormInput id='content' type='text' onChange={handleChange} /><br />
        <Button variant='write' size='15' onClick={onClick}>등록</Button><br /><br />
        {
          detail.data.get_reply && detail.data.get_reply.map((item, i) => {
            return (
              <tr key={i}>
                <label>{item.qna_re_content}</label>
                <button onClick={() => replyDelete(item)}>삭제</button><br /><br />
              </tr>
            );
          })
        }
      </div>
    </div>
  );
};

export default QnaDetail;