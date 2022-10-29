import { Box, Divider, IconButton, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ProfileInfoRow from './ProfileInfoRow';
import WorkIcon from '@material-ui/icons/Work';
import orange from '@material-ui/core/colors/orange';

const WorkSection = () => {
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
          <WorkIcon fontSize="large" style={{ color: orange[900], marginRight: theme.spacing(1) }} />
          Công việc
        </Typography>
        <IconButton aria-label="edit-personla-info">
          <AddCircleIcon />
        </IconButton>
      </Box>
      <Box style={{ paddingLeft: theme.spacing(6) }}>
        <ProfileInfoRow title="Nơi công tác/Công ty" content="Công ty phần mềm FPT" />
        <ProfileInfoRow title="Chức vụ" content="Lập trình viên FE" />
        <ProfileInfoRow title="Tỉnh/Thành phố" content="HCM" />
        <ProfileInfoRow title="Thời gian" content="2011 - 2012" />

        <Divider style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />

        <ProfileInfoRow title="Nơi công tác/Công ty" content="Công ty phần mềm FPT" />
        <ProfileInfoRow title="Chức vụ" content="Lập trình viên FE" />
        <ProfileInfoRow title="Tỉnh/Thành phố" content="HCM" />
        <ProfileInfoRow title="Thời gian" content="2013 - nay" />
      </Box>
    </div>
  );
}

export default WorkSection;
