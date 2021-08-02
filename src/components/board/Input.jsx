import React, { useState } from 'react';

const FormInput = (props) => {
  const { type, id, className } = props;
  const [inputValue, setInputValue] = useState('');
  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (props.onChange) props.onChange(inputValue);
  };

  return (
    <>
      <input type={type} id={id} value={inputValue} onChange={handleChange} className={className} />
    </>
  );
};

export default FormInput;