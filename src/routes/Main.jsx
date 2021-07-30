import React from 'react';
import { useHistory } from 'react-router-dom';

const Main = () => {
  const history = useHistory();
  const onPage = () => {
    history.push('board');
  };
  return (
    <>
      <div onClick={onPage}>지역게시판</div>
    </>
  );
};

export default Main;