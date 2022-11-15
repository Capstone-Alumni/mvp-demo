import { Box, Button, MenuItem, TextField, Typography, useTheme } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

const WorkForm = ({ defaultValues, onSave }) => {
  const theme = useTheme();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      ...defaultValues
    }
  });

  const onSubmit = (values) => {
    onSave(values);
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      style={{
        borderColor: deepPurple[200],
        borderStyle: 'solid',
        borderWidth: '2px',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
        borderRadius: theme.spacing(2),
        marginBottom: theme.spacing(4),
      }}
    >
      <Typography variant="h6" style={{ marginBottom: theme.spacing(3) }}>
        {
          !defaultValues
            ? "Thêm nơi làm việc"
            : "Chỉnh sửa thông tin"
        }
      </Typography>
      {[
        {
          label: 'Nơi công tác/Công ty',
          name: 'name',
          type: 'text',
        },
        {
          label: 'Chức vụ',
          name: 'role',
          type: 'text',
        },
        {
          label: 'Tỉnh/thành phố',
          name: 'location',
          type: 'text',
        },
        {
          label: 'Thời gian',
          name: 'time',
          type: 'text',
          placeholder: 'yyyy-yyyy'
        },
      ].map((item) => (
          <Controller
            key={item.name}
            name={item.name}
            control={control}
            render={({ field }) => (
              (
                <TextField
                  fullWidth
                  variant="outlined"
                  label={item.label}
                  placeholace={item.placeholace}
                  disabled={item.disabled}
                  select={item.type === 'select'}
                  type={item.type}
                  {...field}
                  style={{ marginBottom: theme.spacing(3) }}
                >
                  {item.options?.map((option) => (
                    <MenuItem key={option.id} value={option.value}>{option.label}</MenuItem>
                  ))}
                </TextField>
              )
            )}
          />
        ))
      }

      <Button type="submit" variant="contained">Lưu</Button>
    </Box>
  );
};

export default WorkForm;
