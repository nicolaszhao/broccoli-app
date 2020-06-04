/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import style from './index.module.scss';

export default function Input({ value = '', ...props }) {
  return (
    <input
      className={style.normal}
      autoComplete="off"
      value={value}
      {...props}
    />
  );
}
