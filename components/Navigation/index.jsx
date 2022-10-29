import React, { useCallback, useEffect } from 'react';
import { Button, Typography } from '@material-ui/core';
import { useStyles } from './styles';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NavLink from './../NavLink';
import { mainNavigate } from '../../common/Link';
import { signOut } from 'next-auth/client';
import { loadUser } from '../../redux/actions/userActions';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

const NavigationBar = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.loadedUser);
  useEffect(() => {
    if (router.pathname !== '/course/[id]/exams/[attemptId]') {
      dispatch(loadUser());
    }
  }, [router]);

  const handleRenderNavigate = useCallback(() => {
    return mainNavigate.map((link) => {
      return (
        <NavLink
          IconBold={link.IconBold}
          IconOutlined={link.IconOutlined}
          router={router}
          navLinkName={link.navLinkName}
          abstractName={link.abstractName}
          classNames={classes}
          key={link.keyName}
          content={link.content}
        />
      );
    });
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.containerLogo}>
        <Link href="/" passHref shallow>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Image
              src="/logo.png"
              alt="nbk new logo"
              width="48px"
              height="48px"
            />
            <Typography className={classes.logo} style={{ marginLeft: '0.5rem' }}>Trường THCS chuyên Nguyễn Bỉnh Khiêm</Typography>
          </div>
        </Link>
      </div>
      <div className={classes.containerItems}>{handleRenderNavigate()}</div>
      <>
        {!loading && !user && (
          <Link href="/login" passHref>
            <Button className={classes.buttonSignIn}>Đăng nhập</Button>
          </Link>
        )}
        {!loading && user && (
          <>
            <div className={classes.userAvatarContainer}>
              <Link href="/profile" passHref>
                <img
                  src={user.avatar.url}
                  alt="user-avatar"
                  style={{ borderRadius: '50%', width: '48px', height: '48px' }}
                />
              </Link>
            </div>
            <div className={classes.signOutContainer} onClick={() => signOut()}>
              <ExitToAppIcon className={classes.iconLogout} />
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default NavigationBar;
