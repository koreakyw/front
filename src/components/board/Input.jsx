import React from 'react';

const FormInput = (props) => {
  const { type, id, value, className } = props;
  const handleChange = (e) => {
    const obj = {
      [e.target.id]: e.target.value
    };
    const condition = {
      ...obj,
      id: e.target.id,
      value: e.target.value
    };
    props.onChange(condition);
  };

  return (
    <>
      <input type={type} id={id} value={value} onChange={handleChange} className={className} />
    </>
  );
};

export default FormInput;