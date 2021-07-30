import React, { useEffect, useState } from 'react';
import Categroy from 'components/board/Category';

import {
  News, Notice, Region, Qna, DailyNews
} from 'containers/board';

const Board = () => {
  const [page, setPage] = useState();

  useEffect(() => {
    setPage(<Notice />);
  }, []);

  const onMove = (type) => {
    let ComponentName = null;
    switch (type) {
      case 'news':
        ComponentName = <News />;
        break;
      case 'dailyNews':
        ComponentName = <DailyNews />;
        break;
      case 'region':
        ComponentName = <Region />;
        break;
      case 'qna':
        ComponentName = <Qna />;
        break;
      default:
        ComponentName = <Notice />;
        break;
    }
    setPage(ComponentName);
  };

  return (
    <>
      <Categroy onMove={onMove} /> {/*  onMove={onMove}를 사용하면 해당 onMove 인자값을 임의로 지정하여 선언할수있다. */}
      <hr />
      {page}
    </>
  );
};

export default Board;