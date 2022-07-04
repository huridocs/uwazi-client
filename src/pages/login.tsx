import React, { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { login } from 'services/user';

const Login: NextPage = () => {
  const [loginError, setLoginError] = useState<unknown>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  register('username', {
    required: true,
  });
  register('password', {
    required: true,
  });

  const onSubmit: SubmitHandler<FieldValues> = async ({ username, password }) => {
    try {
      const response = await login(username, password);
      if (!response.error) {
        router.push(router.query.from || '/library/cards');
      }
    } catch (e) {
      setLoginError(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" {...register('username')} />
        {errors.username && <p>Username is required.</p>}
        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register('password')} />
        {errors.password && <p>Password is required.</p>}
        <button type="submit">Login</button>
        {loginError && <p>Login failed</p>}
      </>
    </form>
  );
};
export default Login;
