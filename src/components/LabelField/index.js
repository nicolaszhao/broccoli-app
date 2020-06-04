import React from 'react';
import { Field } from 'rc-field-form';
import cns from 'classnames';
import style from './index.module.scss';

const Error = ({ children }) => (
  <p className={style.errors}>
    {children[0]}
  </p>
);

export default function LabelField({
  name,
  label,
  children,
  ...restProps
}) {
  return (
    <Field
      name={name}
      {...restProps}
    >
      {(control, meta) => (
        <div className={cns({
          [style.wrapper]: true,
          [style.ok]: meta.touched && meta.errors.length === 0,
          [style.error]: meta.errors.length > 0,
        })}
        >
          <label htmlFor={name} className={style.label}>{label || name}</label>
          <div className={style.control}>
            {React.cloneElement(children, {
              id: name,
              ...control,
            })}
          </div>
          <Error>{meta.errors}</Error>
        </div>
      )}
    </Field>
  );
}
