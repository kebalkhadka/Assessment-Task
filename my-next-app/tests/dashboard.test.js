import { render } from '@testing-library/react';
import { useRouter } from 'next/router';
import Dashboard from '../pages/dashboard'; // Adjust the path as needed

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Dashboard Page', () => {
  it('redirects unauthenticated users to login page', () => {
    const push = jest.fn();
    useRouter.mockImplementation(() => ({ push }));

    localStorage.removeItem('isLoggedIn'); // Ensure the user is not logged in

    render(<Dashboard />);

    expect(push).toHaveBeenCalledWith('/login'); // Verify redirection to login
  });
});
