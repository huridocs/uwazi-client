import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from 'pages/login';
import * as userService from 'services/user';

const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    ...jest.requireActual('next/router'),
    route: '/login',
    pathname: '/login',
    push: mockPush,
  }),
}));

//user should be redirected to previous unauthorized page after a successful login
//user should receive an error message if login fails
//user should be able to recover password
//should allow users to see all the app links

describe('login', () => {
  beforeEach(() => {
    render(<Login />);
    jest.clearAllMocks();
  });

  it('should allow users to login', async () => {
    await userEvent.type(screen.getByLabelText('Username'), 'admin');
    await userEvent.type(screen.getByLabelText('Password'), 'password');
    const loginButton = screen.getByText('Login');
    await userEvent.click(loginButton);

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/library/cards');
  });

  it.each`
    username   | password      | errorMessage
    ${'admin'} | ${''}         | ${'Password is required.'}
    ${''}      | ${'password'} | ${'Username is required.'}
  `('should not login when there is an error', async ({ username, password, errorMessage }) => {
    username && (await userEvent.type(screen.getByLabelText('Username'), username));
    password && (await userEvent.type(screen.getByLabelText('Password'), password));
    const loginButton = screen.getByText('Login');
    await userEvent.click(loginButton);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(mockPush).not.toBeCalled();
  });

  it('should show an error message when login fails', async () => {
    await userEvent.type(screen.getByLabelText('Username'), 'admin');
    await userEvent.type(screen.getByLabelText('Password'), 'invalidPassword');
    const loginButton = screen.getByText('Login');

    jest.spyOn(userService, 'login').mockRejectedValue(new Error('Invalid username or password'));
    await userEvent.click(loginButton);
    expect(screen.getByText('Login failed')).toBeInTheDocument();
  });
});
