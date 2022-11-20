import { Box, IconButton, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import ProfileInfoRow from './ProfileInfoRow';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import indigo from '@material-ui/core/colors/indigo';

const AccountSection = () => {
  const theme = useTheme();
  return (
    <div
      style={{
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        borderRadius: theme.spacing(2),
      }} 
    >
      <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: theme.spacing(2) }}>
        <Typography variant="h5" style={{ display: 'flex', fontWeight: 'bold', alignItems: 'center' }}>
          <AccountCircleIcon fontSize="large" style={{ color: indigo[500], marginRight: theme.spacing(1) }} />
          Tài khoản
        </Typography>
        {/* <IconButton aria-label="edit-personla-info">
          <EditIcon />
        </IconButton> */}
      </Box>
      <Box style={{ paddingLeft: theme.spacing(6) }}>
        <ProfileInfoRow title="Username" content="trung.truong.123" />
        <ProfileInfoRow title="Email" content="trung.truong@gmail.com" />
        <ProfileInfoRow title="Password" content="****" />
      </Box>
    </div>
  );
}

export default AccountSection;
