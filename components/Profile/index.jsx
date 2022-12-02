import React, { useMemo, useState } from 'react';
import { useStyles } from './styles';
import { Avatar, Box, Container, Grid, IconButton, Typography, useTheme } from '@material-ui/core';
import FormPersonalInfo from '../Form/FormPersonalInfo';
import { personalInformation } from '../../common/InputForm';
import deepPurple from '@material-ui/core/colors/deepPurple';
import AccountSection from './AccountSection';
import DegreeSection from './DegreeSection';
import WorkSection from './WorkSection';
import { useSelector } from 'react-redux';
import PersonalInformation from './PersonalInformation';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import { useEffect } from 'react';

const Profile = () => {
  const theme = useTheme();
  const router = useRouter();

  const currentUser = useSelector((state) => {
    return state.loadedUser.user;
  });

  const isOwner = useMemo(() => {
    return router.query.id === currentUser?._id;
  }, [currentUser]);

  return (
    <Container
      style={{
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
      }}
    >
      <PersonalInformation editable={isOwner} /> 

      {/* { isOwner ? <AccountSection /> : null} */}

      <WorkSection uid={router.query.id} editable={isOwner}/>
    </Container>
  );
};

export default Profile;
