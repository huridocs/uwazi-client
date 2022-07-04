import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Login from 'pages/login';

describe('login', () => {
  //user should login
  //user should be redirected to home page after a successful login
  //user should receive an error message if login fails
  //user should be able to recover password
  //should allow users to see all the app links

  const mock = jest.fn();
  const mockReplace = jest.mock('next/router', () => ({
    useRouter: () => ({
      ...jest.requireActual('next/router'),
      route: '/login',
      pathname: '/login',
      push: mock,
    }),
  }));

  // jest.mock('./someModule', () => ({
  //     ...jest.requireActual('./someModule'),
  //     api: () => Promise.resolve('foo'),
  //   }));
  // nextRouter.useRouter = jest.fn()
  // nextRouter.useRouter.mockImplementation(() => ({
  // route: '/welcome/create-password',
  // pathname: '/welcome/create-password',
  // replace: mockReplace,
  // }))

  beforeAll(() => {
    render(<Login />);
  });

  it('should allow users to login', async () => {
    const loginInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(loginInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);

    await waitFor(() => expect(mock).toHaveBeenCalledTimes(1));
    expect(mock).toHaveBeenCalledWith('/library/cards');
  });
});
