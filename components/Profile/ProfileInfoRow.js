import { Grid, Typography, useTheme } from '@material-ui/core';
import React from 'react';

const ProfileInfoRow = ({ title, content }) => {
  const theme = useTheme();
  return (
    <Grid container style={{ marginBottom: theme.spacing(1) }}>
      <Grid item xs={3} style={{ textAlign: 'left' }}>
        <Typography style={{ fontWeight: 'bold' }}>{title}</Typography>
      </Grid>
      <Grid item xs={9} style={{ textAlign: 'left' }}>
        <Typography>{content}</Typography>
      </Grid>
    </Grid>
  );
}

export default ProfileInfoRow;
