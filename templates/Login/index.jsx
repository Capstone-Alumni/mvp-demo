import React from 'react';
import { loginInputs } from '../../common/InputForm';
import { useStyles } from '../../styles/SignUpLoginStyles';
import Form from '../../components/Form/FormLoginSignUp';
import CoverSignUpLogin from '../../components/CoverSignUpLogin';
import { signIn } from 'next-auth/client';
import { toast } from 'react-toastify';

const Login = () => {
  const classes = useStyles();

  const handleFilledForm = async (user) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: user.email,
      password: user.password,
    });
    if (result.error) {
      toast.error(result.error);
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.containerLogin}>
        <Form
          type="login"
          title="Đăng nhập"
          inputs={loginInputs}
          handleFilledForm={handleFilledForm}
        />
      </div>
      <div className={classes.containerBigImg}>
        <CoverSignUpLogin />
      </div>
    </div>
  );
};

export default Login;
