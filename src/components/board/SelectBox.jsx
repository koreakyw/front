import React, { useState } from 'react';

const SelectBox = (props) => {
  const { id, optionName, data } = props;
  const [selectedData, updateSelectedData] = useState('');

  const handleChange = (e) => {
    updateSelectedData(e.target.value);
    if (props.onSelectChange) props.onSelectChange(selectedData);
  };

  const options = data.map(data => (
    <option key={data.id} value={data.value}>
      {data.text}
    </option>
  ));

  return (
    <select id={id} onChange={handleChange}>
      <option>{optionName}</option>
      {options}
    </select>
  );
};

export default SelectBox;