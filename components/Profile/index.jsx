import React from 'react';
import { useStyles } from './styles';
import { Avatar, Box, Container, Grid, IconButton, Typography, useTheme } from '@material-ui/core';
import FormPersonalInfo from '../Form/FormPersonalInfo';
import { personalInformation } from '../../common/InputForm';
import EditIcon from '@material-ui/icons/Edit';
import deepPurple from '@material-ui/core/colors/deepPurple';
import AccountSection from './AccountSection';
import DegreeSection from './DegreeSection';
import WorkSection from './WorkSection';
import { useSelector } from 'react-redux';

const Profile = () => {
  const theme = useTheme();
  const classes = useStyles();

  const currentProfile = useSelector((state) => {
    return state.loadedUser.currentProfile;
  });

  return (
    <Container
      style={{
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
      }}
    >
      {/** Personal information */}
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
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div>
            <Avatar
              src={currentProfile.avatar.url}
              style={{
                width: theme.spacing(16),
                height: theme.spacing(16),
                marginBottom: theme.spacing(2),
              }}
            />
            <Box>
              <Typography variant="h4" style={{ fontWeight: 'bold' }}>{currentProfile.name}</Typography>
              <Typography variant="subtitle">Summary</Typography>
            </Box>
          </div>
          <div>
            <IconButton aria-label="edit-personla-info">
              <EditIcon />
            </IconButton>
          </div>
        </Box>

        <Box style={{ display: 'flex', justifyContent:'space-between' }}>
          <Box style={{ flex: 1 }}>
            <Box mb={2}>
              <Typography variant="h6">Địa chỉ</Typography>
              <Typography>{currentProfile.location}</Typography>
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
              <Typography>{currentProfile.gender}</Typography>
            </Box>
           <Box mb={2}>
              <Typography variant="h6">Ngày sinh</Typography>
              <Typography>{currentProfile.dateOfBirth}</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="h6">Tình trạng hôn nhân</Typography>
              <Typography>{currentProfile.marriageStatus}</Typography>
            </Box>
          </Box>
          <Box style={{ flex: 1 }}>
            <Box mb={2}>
             <Typography variant="h6">Chuyên môn</Typography>
              <Typography>{currentProfile.career}</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="h6">Facebook</Typography>
              <Typography>{currentProfile.facebookUrl}</Typography>
            </Box>
          </Box>
        </Box>
      </div>

      <AccountSection />
      
      <DegreeSection />

      <WorkSection />
    </Container>
  );
};

export default Profile;
