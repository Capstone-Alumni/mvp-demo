import { Avatar, Box, Button, IconButton, Input, MenuItem, TextField, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deepPurple } from '@material-ui/core/colors';
import { Controller, useForm } from 'react-hook-form';
import { updateUserProfile } from '../../redux/actions/userActions';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';

const getGenderName = (id) => {
  switch(id) {
    case 'male':
      return "Nam";
    case 'female':
      return "Nữ";
    default:
      return "Khác";
  }
}

const InformationView = ({ currentProfile, requestEdit, editable }) => {
  const theme = useTheme();

  return (
    <div
      style={{
        background: deepPurple[50],
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        borderRadius: theme.spacing(2),
      }}    
    >
      <Box
        mb={2}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ marginRight: theme.spacing(2) }}>
          <Avatar
            src={currentProfile.avatar.url}
            style={{
              width: theme.spacing(16),
              height: theme.spacing(16),
              marginBottom: theme.spacing(2),
            }}
          />
        </div>
        <div style={{ flex: 1, marginTop: theme.spacing(2) }}>
          <Typography variant="h5" fontWeight="fontWeightBold">{currentProfile.fullname}</Typography>
          <Typography>Niên khoá: {currentProfile.school_year}</Typography>
          <Typography>Class: {currentProfile.classes}</Typography>
        </div>
        {
          editable
            ? (
              <div>
                <IconButton aria-label="edit-personla-info" onClick={requestEdit}>
                  <EditIcon />
                </IconButton>    
              </div>
            )
            : null
        }

      </Box>

      <Box style={{ display: 'flex', justifyContent:'space-between' }}>
        <Box style={{ flex: 1 }}>
          <Box mb={2}>
            <Typography variant="h6">Địa chỉ</Typography>
            <Typography>{currentProfile.address}</Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Số điện thoại</Typography>
            <Typography>{currentProfile.phone}</Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Email liên hệ</Typography>
            <Typography>{currentProfile.email}</Typography>
          </Box>
        </Box>
        <Box style={{ flex: 1 }}>
          <Box mb={2}>
            <Typography variant="h6">Giới tính</Typography>
            <Typography>{getGenderName(currentProfile.gender)}</Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Ngày sinh</Typography>
            <Typography>{new Date(currentProfile.date_of_birth).toDateString()}</Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Tình trạng hôn nhân</Typography>
            <Typography>{currentProfile.marriage ? "Đã kết hôn" : 'Chưa kết hôn'}</Typography>
          </Box>
        </Box>
        <Box style={{ flex: 1 }}>
          <Box mb={2}>
            <Typography variant="h6">Chuyên môn</Typography>
            <Typography>{currentProfile.career}</Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Facebook</Typography>
            <Typography>{currentProfile.facebook?.url}</Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

const InformationForm = ({ defaultValues, afterSaved }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      ...defaultValues,
      gender: defaultValues.gender ?? 'other',
      marriage: defaultValues.marriage ?? false,
      date_of_birth: defaultValues.date_of_birth ?? new Date(),
      facebook_url: defaultValues.facebook.url ?? '',
    },
  });

  const onSubmit = (values) => {
    dispatch(updateUserProfile(values));
    afterSaved();
  }


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        background: deepPurple[50],
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        borderRadius: theme.spacing(2),
      }}    
    >
      {[
        {
          label: 'Username',
          name: 'username',
          type: 'text',
          disabled: true,
        },
        {
          label: 'Email',
          name: 'email',
          type: 'text',
          disabled: true,
        },
        {
          label: 'Họ và tên',
          name: 'fullname',
          type: 'text',
        },
        {
          label: 'Địa chỉ',
          name: 'address',
          type: 'text',
        },
        {
          label: 'Số điện thoại',
          name: 'phone',
          type: 'text',
        },
        {
          label: 'Giới tính',
          name: 'gender',
          type: 'select',
          options: [
            { id: 'male', value: 'male', label: 'Nam' },
            { id: 'female', value: 'female', label: 'Nữ' },
            { id: 'other', value: 'other', label: 'Khác' },
          ]
        },
        {
          label: 'Ngày sinh',
          name: 'dob',
          type: 'date'
        },
        {
          label: 'Tình trạng hôn nhân',
          name: 'marriage',
          type: 'select',
          options: [
            { id: 1, value: true, label: 'Đã kết hôn' },
            { id: 2, value: false, label: 'Chưa kết hôn' },
          ]
        },
        {
          label: 'Lĩnh vực làm việc',
          name: 'career',
          type: 'text',
        },
        {
          label: 'Facebook',
          name: 'facebook_url',
          type: 'text',
        }
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
      ))}

      <Button variant="contained" type="submit">Lưu</Button>
    </form>
  )
};

const PersonalInformation = ({ editable }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const currentProfile = useSelector((state) => {
    return state.loadedUser.currentProfile;
  });

  return !isEditMode
    ? <InformationView currentProfile={currentProfile} requestEdit={() => setIsEditMode(true)} editable={editable} />
    : <InformationForm defaultValues={currentProfile} afterSaved={() => setIsEditMode(false)} />
};

export default PersonalInformation;
