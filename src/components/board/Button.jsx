import React from 'react';

const Button = (props) => {
  const { variant, size, onClick } = props;
  return (
    <button className={`btn-${variant} btn-${size}`} onClick={onClick}>{props.children}</button>
  );
};

export default Button;