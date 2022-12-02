import { Button, Typography } from '@material-ui/core';
import { useStyles } from './styles';
import React from 'react';
import Input from '../../Input';
import Link from 'next/link';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CircularProgress from '@material-ui/core/CircularProgress';

const schemaSignUp = yup
  .object({
    email: yup.string().email('Invalid format').required('Bắt buộc'),
    school_year: yup.string().required('Bắt buộc'),
    classes: yup.string().required('Bắt buộc'),
    password: yup
      .string()
      .required('Bắt buộc')
      .min(6, 'Ít nhất 6 ký tự')
      .max(20, 'Tối đa 20 ký tự'),
    passwordConfirmation: yup
      .string()
      .required('Bắt buộc')
      .test('passwords-match', 'Mật khẩu không khớp', function (value) {
        return this.parent.password === value;
      }),
  })
  .required();

const schemaLogin = yup
  .object({
    email: yup.string().required('Bắt buộc'),
    password: yup.string().required('Bắt buộc'),
  })
  .required();

const Form = ({ type, title, inputs, handleFilledForm }) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(type === 'login' ? schemaLogin : schemaSignUp),
  });


  const handleRenderInputs = (register, errors) => {
    return inputs.map((input) => {
      return (
        <Input
          key={input.index}
          classNames={classes}
          placeholder={input.placeholder}
          label={input.label}
          name={input.name}
          type={input.type}
          selectItems={input.selectItems}
          register={register}
          required
          errors={errors}
        />
      );
    });
  };
  const onSubmit = (data) => {
    handleFilledForm(data);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0,width=device-width" />
      </Head>
      <Typography className={classes.title}>{title}</Typography>
      <Typography className={classes.description} />
      <form onSubmit={handleSubmit(onSubmit)}>
        {handleRenderInputs(register, errors)}

        <Button className={classes.buttonLogin} type="submit">
          {/* <CircularProgress size={16} /> */}
          <Typography>{title}</Typography>
        </Button>
      </form>
      <Typography className={classes.blackText}>
        {type == 'signup' ? 'Đã có tài khoản ?' : 'Chưa đăng ký?'}{' '}
        {type == 'signup' ? (
          <Link href="/login" passHref>
            <span className={classes.purpleText}>Đăng nhập</span>
          </Link>
        ) : (
          <Link href="/signup" passHref>
            <span className={classes.purpleText}>Tạo tài khoản</span>
          </Link>
        )}
      </Typography>
    </>
  );
};

export default Form;
