import React, { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';

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

  const onSubmit: SubmitHandler<FieldValues> = async ({ username, password, remember }) => {
    try {
      const response = await login(username, password, remember);
      if (!response.error) {
        router.push(router.query.from || '/library/cards');
      }
    } catch (e) {
      setLoginError(e);
    }
  };

  return (
    <section>
      <div className="login-container flex min-h-screen">
        <div className="image hidden md:block relative w-1/2">
          <Image
            src="/loginPicture.jpg"
            alt="UWAZI image presentation"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="form w-1/2">
          <div className="title flex">
            <Image src="/uwazi-icon.svg" alt="UWAZI logo" height="60px" width="44px" />
            <h1 className="text-xl font-bold text-rose-700">UWAZI</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="fields flex flex-col p-4 m-4 bg-white border rounded-md border-neutral-300 hover:border-neutral-500 hover:shadow-md">
              <>
                <h2 className="mb-4 font-bold text-center">Welcome</h2>
                <label htmlFor="username" className="username flex flex-col">
                  Username
                  <input
                    type="text"
                    id="username"
                    {...register('username', {
                      required: true,
                    })}
                    autoComplete="false"
                  />
                  {errors.username && <p>Username is required.</p>}
                </label>
                <label htmlFor="password" className="password flex flex-col">
                  Password
                  <input
                    type="password"
                    id="password"
                    {...register('password', {
                      required: true,
                    })}
                    autoComplete="false"
                  />
                  {errors.password && <p>Password is required.</p>}
                </label>
                <label htmlFor="remember" className="remember flex flex-row gap-3">
                  <input type="checkbox" id="remember" {...register('remember')} />
                  Remember me
                </label>
                <button
                  type="submit"
                  className="inline-block py-3 text-sm font-medium bg-gray-300 rounded shadow-md px-7 "
                >
                  Login
                </button>
                {loginError && <p>Login failed</p>}
              </>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default Login;
