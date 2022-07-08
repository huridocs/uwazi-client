import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from 'pages/login';
import * as userService from 'services/user';
import { login, recoverPassword } from 'services/user';

const mockPush = jest.fn();
const queryParams = { from: '' };

jest.mock('next/router', () => ({
  useRouter: () => ({
    ...jest.requireActual('next/router'),
    route: '/login',
    pathname: '/login',
    push: mockPush,
    query: queryParams,
  }),
}));

describe('login', () => {
  beforeEach(() => {
    render(<Login />);
    jest.clearAllMocks();
  });

  it('should allow users to login', async () => {
    await act(async () => {
      await userEvent.type(screen.getByLabelText('Username'), 'admin');
      await userEvent.type(screen.getByLabelText('Password'), 'password');
      await userEvent.click(screen.getByText('Login'));
    });

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/library/cards');
  });

  it.each`
    username   | password      | errorMessage
    ${'admin'} | ${''}         | ${'Password is required.'}
    ${''}      | ${'password'} | ${'Username is required.'}
  `('should not login when there is an error', async ({ username, password, errorMessage }) => {
    await act(async () => {
      username && (await userEvent.type(screen.getByLabelText('Username'), username));
      password && (await userEvent.type(screen.getByLabelText('Password'), password));
      await userEvent.click(screen.getByText('Login'));
    });

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(mockPush).not.toBeCalled();
  });

  it('should show an error message when login fails', async () => {
    jest
      .spyOn(userService, 'login')
      .mockResolvedValueOnce({ data: '', error: { code: 'invalid_login' } });

    await act(async () => {
      await userEvent.type(screen.getByLabelText('Username'), 'admin');
      await userEvent.type(screen.getByLabelText('Password'), 'invalidPassword');
      await userEvent.click(screen.getByLabelText('Remember me'));
      await userEvent.click(screen.getByText('Login'));
    });

    expect(screen.getByText('Login failed')).toBeInTheDocument();
  });

  it('should redirect users to the previous unauthorized page after a successful login', async () => {
    queryParams.from = '/settings/account';
    const loginButton = screen.getByText('Login');

    await act(async () => {
      await userEvent.type(screen.getByLabelText('Username'), 'admin');
      await userEvent.type(screen.getByLabelText('Password'), 'invalidPassword');
      await userEvent.click(loginButton);
    });

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/settings/account');
  });

  it('should allow to remember credentials', async () => {
    jest.spyOn(userService, 'login').mockResolvedValueOnce({ data: {} });

    await act(async () => {
      await userEvent.type(screen.getByLabelText('Username'), 'admin');
      await userEvent.type(screen.getByLabelText('Password'), 'password');
      await userEvent.click(screen.getByLabelText('Remember me'));
      await userEvent.click(screen.getByText('Login'));
    });

    expect(login).toBeCalledWith('admin', 'password', true);
  });

  it('should allow users to recover password', async () => {
    jest.spyOn(userService, 'recoverPassword').mockResolvedValueOnce({ data: {} });

    await userEvent.click(screen.getByText('Forgot password?'));
    await userEvent.type(screen.getByLabelText('Email'), 'admin@huridocs.org');

    await act(async () => {
      await userEvent.click(screen.getByText('Send recovery email'));
    });

    expect(recoverPassword).toBeCalledWith('admin@huridocs.org');
    expect(screen.queryByText('Send recovery email')).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Go back to Login'));

    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('should allow user to click on the support links', async () => {
    expect((screen.getByText('Website') as HTMLElement).getAttribute('href')).toEqual(
      'https://uwazi.io/'
    );
    expect((screen.getByText('Documentation') as HTMLElement).getAttribute('href')).toEqual(
      'https://uwazi.readthedocs.io'
    );
    expect((screen.getByText('Contribute') as HTMLElement).getAttribute('href')).toEqual(
      'https://github.com/huridocs'
    );
    expect((screen.getByText('Twitter') as HTMLElement).getAttribute('href')).toEqual(
      'https://twitter.com/HURIDOCS'
    );
  });
});
