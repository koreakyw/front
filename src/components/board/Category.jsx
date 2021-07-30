import React from 'react';

const Categroy = (props) => {
  const { onMove } = props;

  const onPage = (key) => {
    onMove(key);
  };

  return (
    <>
      <div onClick={() => onPage('region')}>지역게시판</div>
      <div onClick={() => onPage('news')}>뉴스게시판</div>
      <div onClick={() => onPage('dailyNews')}>데일리뉴스</div>
      <div onClick={() => onPage('qna')}>문의게시판</div>
      <div onClick={() => onPage('notice')}>공지게시판</div>
    </>
  );
};

export default Categroy;