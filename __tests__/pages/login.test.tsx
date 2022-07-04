import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Login from 'pages/login';

const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    ...jest.requireActual('next/router'),
    route: '/login',
    pathname: '/login',
    push: mockPush,
  }),
}));

describe('login', () => {
  //user should login
  //user should be redirected to home page after a successful login
  //user should be redirected to previous unauthorized page after a successful login
  //user should receive an error message if login fails
  //user should be able to recover password
  //should allow users to see all the app links

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

    await waitFor(() => expect(mockPush).toHaveBeenCalledTimes(1));
    expect(mockPush).toHaveBeenCalledWith('/library/cards');
  });
});
