import React, { useEffect, useState } from 'react';
import { boardService } from 'services';
import QuillEditor from 'components/board/QuillEditor';
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
    const res = await boardService.detail('qna', props.idx);
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

  const qnaModify = async () => {
    console.log('qnaModify');
  };

  const qnaDelete = async () => {
    const res = await boardService.delete('qna', props.idx);
    loadData();
    console.log(res);
  };

  const replyModify = async (condition) => {
    console.log(condition);
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
        <button onClick={() => qnaModify}>수정</button>
        <button onClick={() => qnaDelete}>삭제</button><br /><br />
        <QuillEditor
          theme='bubble'
          id='content'
          value={detail.data.content ?? ''}
          readOnly
        />
      </div>
      <div>
        댓글
        <FormInput id='content' type='text' onChange={handleChange} /><br />
        <Button variant='write' size='15' onClick={onClick}>등록</Button><br /><br />
        {
          detail.data.get_reply && detail.data.get_reply.map((item, i) => {
            return (
              <tr key={i}>
                <label>{item.reg_user_id}  </label>
                <label>{item.reg_date}  </label>
                <button onClick={() => replyModify(item)}>수정</button>
                <button onClick={() => replyDelete(item)}>삭제</button><br />
                <label>{item.qna_re_content}</label><br /><br />
              </tr>
            );
          })
        }
      </div>
    </div>
  );
};

export default QnaDetail;