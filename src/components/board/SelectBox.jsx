import React from 'react';

const SelectBox = (props) => {
  const { id, optionName, data } = props;

  const handleChange = (e) => {
    const obj = {
      [e.target.id]: e.target.value
    };
    const condition = {
      ...obj,
      id: e.target.id
    };
    props.onSelectChange(condition);
  };

  // const subHandleChange = (e) => {
  //   const obj = {
  //     [e.target.id]: e.target.value
  //   };
  //   updateSelectedSubData({
  //     ...selectedSubData, ...obj
  //   });
  //   props.onSubSelectChange(obj);
  // };

  const options = data.map((item, i) => {
    return (
      <option key={item.value} value={item.value}>
        {item.text}
      </option>
    );
  });

  const onCheck = (e, id) => {
    handleChange(e, id);
  };

  return (
    <select id={id} onChange={(e) => onCheck(e, id)}>
      <option value=''>{optionName}</option>
      {options}
    </select>
  );
};

SelectBox.defaultProps = {
  data: []
};

export default SelectBox;