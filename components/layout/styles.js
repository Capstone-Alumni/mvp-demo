import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  containerNavigationBar: {
    width: '100%',
    height: '80px',
  },
  containerNavigationBarOnHide: {
    display: 'none',
  },
  containerComponent: {
    width: '100%',
    minHeight: '100vh',
    position: 'relative',
    overflow: 'auto !important',
    transition: 'width 1s',
  },
  containerComponentOnHide: {
    width: 'calc(100vw)',
  },
}));
