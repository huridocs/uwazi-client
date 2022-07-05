import React, { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { login, recoverPassword } from 'services/user';

const Login: NextPage = () => {
  const [loginError, setLoginError] = useState<unknown>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [recoveringPassword, setRecoveringPassword] = useState(false);
  const [recoveredPassword, setRecoveredPassword] = useState(false);

  const onSubmitLogin: SubmitHandler<FieldValues> = async ({ username, password, remember }) => {
    const response = await login(username, password, remember);

    if (!response.error) {
      const refererUrl = Array.isArray(router.query.from)
        ? router.query.from[0]
        : router.query.from;
      return router.push(refererUrl ? encodeURI(refererUrl) : '/library/cards');
    }

    setLoginError(response.error);
  };

  const onSubmitRecovery: SubmitHandler<FieldValues> = async ({ email }) => {
    const response = await recoverPassword(email);

    if (!response.error) {
      setRecoveredPassword(true);
    }
  };

  return (
    <section>
      <div className="login-container flex min-h-screen">
        <div className="image hidden md:flex flex-col w-1/2">
          <div className="relative h-full">
            <Image
              src="/loginPicture.jpg"
              alt="UWAZI image presentation"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="">
            <Link target="_blank" href="https://uwazi.io/">
              Website
            </Link>
            <Link target="_blank" href="https://uwazi.readthedocs.io">
              Documentation
            </Link>
            <Link target="_blank" href="https://github.com/huridocs">
              Contribute
            </Link>
            <Link target="_blank" href="https://twitter.com/HURIDOCS">
              Twitter
            </Link>
          </div>
        </div>
        <div className="form w-1/2">
          <div className="title flex">
            <Image src="/uwazi-icon.svg" alt="UWAZI logo" height="60px" width="44px" />
            <h1 className="text-xl font-bold text-rose-700">UWAZI</h1>
          </div>
          <div className="fields flex flex-col p-4 m-4 bg-white border rounded-md border-neutral-300 hover:border-neutral-500 hover:shadow-md">
            {!recoveringPassword && (
              <form onSubmit={handleSubmit(onSubmitLogin)}>
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
                  <div className="flex">
                    <label htmlFor="remember" className="remember flex flex-row gap-3">
                      <input type="checkbox" id="remember" {...register('remember')} />
                      Remember me
                    </label>
                    <button type="button" className="" onClick={() => setRecoveringPassword(true)}>
                      Forgot password?
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="inline-block py-3 text-sm font-medium bg-gray-300 rounded shadow-md px-7 "
                  >
                    Login
                  </button>
                  {loginError && <p>Login failed</p>}
                </>
              </form>
            )}
            {recoveringPassword && !recoveredPassword && (
              <form onSubmit={handleSubmit(onSubmitRecovery)}>
                <label htmlFor="email" className="email flex flex-col">
                  Email
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: true,
                    })}
                    autoComplete="false"
                  />
                  {errors.username && <p>Username is required.</p>}
                </label>
                <button
                  type="submit"
                  className="inline-block py-3 text-sm font-medium bg-gray-300 rounded shadow-md px-7 "
                >
                  Send recovery email
                </button>
              </form>
            )}
            {recoveredPassword && (
              <>
                <p>Check your email for password recover</p>
                <button
                  type="button"
                  onClick={() => {
                    setRecoveredPassword(false);
                    setRecoveringPassword(false);
                  }}
                >
                  Go back to Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
