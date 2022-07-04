import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

const Login: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    router.push('/library/cards');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" name="username" />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" />
      <button type="submit">Login</button>
    </form>
  );
};
export default Login;
