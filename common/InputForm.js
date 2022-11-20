import { classes, schoolYears } from "./staticData";

export const loginInputs = [
  {
    label: 'Email',
    placeholder: 'mail@website.com',
    type: 'text',
    keyName: '1',
    name: 'email',
  },
  {
    label: 'Mật khẩu',
    placeholder: 'password',
    type: 'password',
    keyName: '2',
    name: 'password',
  },
];

export const signUpInputs = [
  {
    label: 'Tên tài khoản',
    placeholder: 'nguyenvana',
    type: 'text',
    keyName: 'username',
    name: 'username',
  },
  {
    label: 'Họ tên',
    placeholder: 'Nguyễn Văn A',
    type: 'text',
    keyName: 'fullname',
    name: 'fullname',
  },
  {
    label: 'Email',
    placeholder: 'mail@website.com',
    type: 'text',
    keyName: '1',
    name: 'email',
  },
  {
    label: 'Niên khoá',
    placeholder: '2001-2004',
    type: 'select',
    keyname: 'school-year',
    name: 'school_year',
    selectItems: schoolYears,
  },
  {
    label: 'Lớp',
    placeholder: '12A1',
    type: 'select',
    keyname: 'classes',
    name: 'classes',
    selectItems: classes,
  },
  {
    label: 'Mật khẩu',
    placeholder: 'password',
    type: 'password',
    keyName: '2',
    name: 'password',
  },
  {
    label: 'Xác thực mật khâủ',
    placeholder: 'password',
    type: 'password',
    keyName: '3',
    name: 'passwordConfirmation',
  },
];

export const personalInformation = [
  {
    label: 'Your Full Name',
    placeholder: 'John Doe',
    type: 'text',
    keyName: '1',
    name: 'fullName',
  },
  {
    label: 'Location',
    placeholder: 'Vietnam',
    type: 'text',
    keyName: '2',
    name: 'location',
  },
  {
    label: 'Facebook',
    placeholder: 'Link to your Facebook account',
    type: 'text',
    keyName: '3',
    name: 'facebook',
  },
  {
    label: 'Twitter',
    placeholder: 'Link to your Twitter account',
    type: 'text',
    keyName: '4',
    name: 'twitter',
  },
];

export const accountProfile = [
  {
    label: 'Username',
    placeholder: 'buigiaanfb1',
    type: 'text',
    keyName: '1',
    name: 'username',
  },
  {
    label: 'Email',
    placeholder: 'johndoe@gmail.com',
    type: 'text',
    keyName: '2',
    name: 'email',
  },
  {
    label: 'Password',
    placeholder: 'anhprovip123',
    type: 'password',
    keyName: '3',
    name: 'password',
  },
];
