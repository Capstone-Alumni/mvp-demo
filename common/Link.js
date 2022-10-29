export const profileTabs = {
  tabsProfile: {
    name: 'My Settings',
    tabs: [
      {
        label: 'Personal Information',
        keyName: '1',
        fullUri: '/profile/personal-information',
        uri: 'personal-information',
      },
      {
        label: 'Account',
        keyName: '2',
        fullUri: '/profile/account',
        uri: 'account',
      },
    ],
  },
};

import HomeIcon from '@material-ui/icons/Home';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

export const mainNavigate = [
  {
    IconBold: AccountCircleIcon,
    IconOutlined: AccountCircleOutlinedIcon,
    abstractName: 'directory',
    navLinkName: '/directory',
    keyName: '2',
    content: 'Danh bạ',
  },
];
