import { MenuItem, Select, TextField, Typography } from '@material-ui/core';
import React from 'react';

const Input = ({
  classNames,
  placeholder = 'mail@website.com',
  label = 'Email',
  type = 'text',
  name,
  selectItems = [],
  register = null,
  required = null,
  errors = null,
}) => {
  return (
    <div className={classNames.input}>
      <Typography>{label}</Typography>
      {
        type === 'select'
          ? (
            <select
              {...register(name, { required })}
            >
              {
                selectItems.map(item => (
                  <option key={item.id} value={item.value}>{item.name}</option>
                ))
              }
            </select>
          )
          : (
            <input
              placeholder={placeholder}
              type={type}
              {...register(name, { required })}
            />
          )
      }
      
      <Typography className={classNames.error}>
        {errors[name]?.message}
      </Typography>
    </div>
  );
};

export default Input;
