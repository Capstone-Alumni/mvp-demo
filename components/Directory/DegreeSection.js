import { Box, Divider, IconButton, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ProfileInfoRow from './ProfileInfoRow';
import SchoolIcon from '@material-ui/icons/School';
import lightGreen from '@material-ui/core/colors/lightGreen';

const DegreeSection = () => {
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
          <SchoolIcon fontSize="large" style={{ color: lightGreen[800], marginRight: theme.spacing(1) }} />
          Bằng cấp
        </Typography>
        <IconButton aria-label="edit-personla-info">
          <AddCircleIcon />
        </IconButton>
      </Box>
      <Box style={{ paddingLeft: theme.spacing(6) }}>
        <ProfileInfoRow title="Trường" content="Đại học FPT" />
        <ProfileInfoRow title="Cấp" content="Cử nhân" />
        <ProfileInfoRow title="Năm tốt nghiệp" content="2002" />

        <Divider style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />

        <ProfileInfoRow title="Trường" content="Đại học quốc gia Singapore" />
        <ProfileInfoRow title="Cấp" content="Thạc sĩ" />
        <ProfileInfoRow title="Năm nghiệp" content="2004" />
      </Box>
    </div>
  );
}

export default DegreeSection;
