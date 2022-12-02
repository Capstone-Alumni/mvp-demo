import { Typography } from '@material-ui/core';
import React from 'react';
import { useStyles } from '../../styles/SignUpLoginStyles';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Link from 'next/link';

const CoverSignUpLogin = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.bigImg}>
        <div className={classes.containerIntro}>
          <Typography className={classes.introTitle} />
          <Typography className={classes.slogan} />
        </div>
      </div>
    </>
  );
};

export default CoverSignUpLogin;
