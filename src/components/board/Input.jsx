import React, { useState } from 'react';

const FormInput = (props) => {
  const { type, id } = props;
  const [inputValue, setInputValue] = useState('');
  const handleChange = (e) => {
    setInputValue(e.target.value);
    console.log('id:', e.target.id);
    if (props.onChange) props.onChange(inputValue);
  };

  return (
    <>
      <input type={type} id={id} value={inputValue} onChange={handleChange} className='Inputclass' />
    </>
  );
};

export default FormInput;