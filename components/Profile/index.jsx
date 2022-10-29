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

const Profile = () => {
  const theme = useTheme();
  const classes = useStyles();

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
              style={{
                width: theme.spacing(16),
                height: theme.spacing(16),
                marginBottom: theme.spacing(2),
              }}
            />
            <Box>
              <Typography variant="h4" style={{ fontWeight: 'bold' }}>Full name</Typography>
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
              <Typography>123 Lê Duẩn, phường 13, quận 1</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="h6">Số điện thoại</Typography>
              <Typography>0123123123</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="h6">Email liên hệ</Typography>
              <Typography>trung.truong@gmail.com</Typography>
            </Box>
          </Box>
          <Box style={{ flex: 1 }}>
            <Box mb={2}>
             <Typography variant="h6">Giới tính</Typography>
              <Typography>Name</Typography>
            </Box>
           <Box mb={2}>
              <Typography variant="h6">Ngày sinh</Typography>
              <Typography>11/01/2011</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="h6">Tình trạng hôn nhân</Typography>
              <Typography>Đã kết hôn/Chưa kết hôn</Typography>
            </Box>
          </Box>
          <Box style={{ flex: 1 }}>
            <Box mb={2}>
             <Typography variant="h6">Chuyên môn</Typography>
              <Typography>Công nghệ thông tin</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="h6">Facebook</Typography>
              <Typography>https://facebook/user/trung.truong</Typography>
            </Box>
          </Box>
        </Box>
      </div>

      <AccountSection />
      
      <DegreeSection />

      <WorkSection />

      {/*
      <div className={classes.root}>
        <div className={classes.containerUserUI}>
          <div className={classes.containerAvatar}>
            <img
              src="https://marketing24h.vn/wp-content/uploads/2020/11/ROI-Content-Marketing.jpg"
              className={classes.avatar}
            />
          </div>
          <div className={classes.containerEditTool}>
            <Typography className={classes.text}>Change your avatar</Typography>
          </div>
        </div>
        <div className={classes.containerUserInfo}>
          <FormPersonalInfo inputs={personalInformation} classNames={classes} />
        </div>
      </div>
        */}
    </Container>
  );
};

export default Profile;
