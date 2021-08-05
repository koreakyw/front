import React from 'react';
import { useHistory } from 'react-router-dom';

const Main = () => {
  const history = useHistory();
  const onPage = (page) => {
    console.log('page:', page);
    history.push(page);
  };
  return (
    <>
      <div onClick={() => onPage('direct')}>직거래</div>
      <div onClick={() => onPage('board')}>지역게시판</div>
    </>
  );
};

export default Main;