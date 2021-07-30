import React, { useState } from 'react';

const SelectBox = (props) => {
  const { id, optionName, data } = props;
  const [selectedData, updateSelectedData] = useState({});
  const [selectedSubData, updateSelectedSubData] = useState({});

  const handleChange = (e) => {
    const obj = {
      [e.target.id]: e.target.value
    };
    updateSelectedData({
      ...selectedData, ...obj
    });
    props.onSelectChange(obj);
    // if (props.onSelectChange) props.onSelectChange(selectedData);
  };

  const subHandleChange = (e) => {
    const obj = {
      [e.target.id]: e.target.value
    };
    updateSelectedSubData({
      ...selectedSubData, ...obj
    });
    props.onSubSelectChange(obj);
  };

  const options = data.data.map((item, i) => {
    return (
      <option key={item.value} value={item.value}>
        {item.text}
      </option>
    );
  });

  const onCheck = (e, id) => {
    console.log('id:', id);
    if (id === 'ctprvn_code') {
      handleChange(e);
    } else {
      subHandleChange(e);
    }
  };

  return (
    <select id={id} onChange={(e) => onCheck(e, id)}>
      <option value=''>{optionName}</option>
      {options}
    </select>
  );
};

export default SelectBox;