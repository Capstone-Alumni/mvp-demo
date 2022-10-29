import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    position: 'static',
    top: '0px',
    left: '0',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    width: '100%',
    padding: '0rem 1rem',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
    zIndex: '1',
  },
  containerLogo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem 0.5rem',
    margin: '0rem 1rem',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 700,
    cursor: 'pointer',
  },
  containerItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    flexGrow: 1,
    padding: '0rem 2rem',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    transition: 'background 0.3s',
    margin: '0rem 1rem',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#E4E2FC',
      transition: 'background 0.3s',
    },
    '&:hover svg': {
      color: '#918fff',
      transition: 'color 0.3s',
    },
  },

  itemActive: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    borderRadius: '8px',
    backgroundColor: 'rgba(20, 0, 255, 0.2)',
    cursor: 'pointer',
    '& svg': {
      color: '#918fff',
    },
  },
  icon: {
    color: '#c9c8fa',
    marginRight: '0.5rem',
  },
  iconLogout: {
    color: '#C9917C',
  },

  userAvatarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    margin: '0rem 1rem',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    transition: 'background 0.3s',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#fcd8cc',
      transition: 'background 0.3s',
    },
    '&:hover svg': {
      color: '#c46d4d',
    },
  },
  buttonSignIn: {
    '&.MuiButton-root': {
      background: '#5951ed',
      color: '#fff',
      borderRadius: '0',
      padding: '0.75rem',
      transition: 'all 0.3s',
      borderRadius: '0.5rem',
      '& .MuiButton-label': {
        fontSize: '14px',
        textTransform: 'none',
        fontWeight: '500',
        lineHeight: '1.2',
      },
      '&:hover': {
        background: '#3027d9',
        color: '#FFF',
        transition: 'all 0.3s',
      },
    },
  },
}));
