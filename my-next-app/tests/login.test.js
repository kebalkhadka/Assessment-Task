import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import LoginPage from '../pages/login'; // Adjust the path as needed

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../utils/auth', () => ({
  loginUser: jest.fn(),
}));

describe('Login Page', () => {
  it('authenticates user and redirects to dashboard', () => {
    const push = jest.fn();
    useRouter.mockImplementation(() => ({ push }));
    const loginUser = require('../utils/auth').loginUser;

    loginUser.mockReturnValue(true); // Mock successful login

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(loginUser).toHaveBeenCalledWith('testuser', 'password'); // Verify loginUser was called
    expect(localStorage.getItem('isLoggedIn')).toBe('true'); // Check if login status was set
    expect(push).toHaveBeenCalledWith('/dashboard'); // Verify redirection to dashboard
  });

  it('displays an error message for invalid login', () => {
    const push = jest.fn();
    useRouter.mockImplementation(() => ({ push }));
    const loginUser = require('../utils/auth').loginUser;

    loginUser.mockReturnValue(false); // Mock failed login

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(loginUser).toHaveBeenCalledWith('testuser', 'wrongpassword'); // Verify loginUser was called
    expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument(); // Check if error message is displayed
    expect(push).not.toHaveBeenCalled(); // Verify no redirection occurred
  });
});
