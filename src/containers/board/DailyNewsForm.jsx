import React, { useEffect, useState } from 'react';
import { boardService } from 'services';
import _ from 'lodash';
import FormInput from 'components/board/Input';
import Button from 'components/board/Button';
import QuillEditor from 'components/board/QuillEditor';

const DailyNewsForm = (props) => {
  const [params, setParams] = useState({
    data: {}
  });
  const [text, setText] = useState('');
  const [inputText, setInputText] = useState('');
  const modules = {
    toolbar: [
      ['bold', 'italic', 'image', 'video']
    ]
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    if (props.mode === 'edit') {
      setInputText(props.data.news_title);
      setText(props.data.news_content);
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

  const dailyNewsCreate = async (condition) => {
    const params = {
      type: 'daily_news',
      news_title: _.get(condition, 'news_title'),
      news_content: _.get(condition, 'news_content')
    };
    const res = await boardService.create(params);
    console.log(res.alertMessage); // 이거는 alert 띄우고 리스트로 페이지 돌리는 방법 필요.
  };

  const dailyNewsModify = async (condition) => {
    const newTitle = _.get(condition, 'news_title') ?? inputText;
    const params = {
      news_title: newTitle,
      news_content: _.get(condition, 'news_content')
    };
    const res = await boardService.modify('daily_news', props.idx, params);
    console.log(res.alertMessage); // 이거는 alert 띄우고 리스트로 페이지 돌리는 방법 필요.
  };

  const onClick = (e) => {
    if (props.mode === 'edit') {
      dailyNewsModify(params);
    } else {
      dailyNewsCreate(params);
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
      데일리뉴스
      <FormInput id='news_title' type='text' value={inputText} className='inputClass' onChange={handleChange} />
      <div className='editor'>
        <QuillEditor id='news_content' theme='snow' modules={modules} value={text} className='inputClass' readOnly={false} onChange={editorHandleChange} />
      </div>
      <Button variant='write' size='15' onClick={onClick}>{props.button_add_name}</Button>
    </div>
  );
};

export default DailyNewsForm;