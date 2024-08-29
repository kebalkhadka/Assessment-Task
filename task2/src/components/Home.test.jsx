// src/components/Home.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import Home from './Home';
import React from 'react';

describe('Home Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders movie list when data is fetched successfully', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ results: [{ id: 1, title: 'Test Movie', poster_path: '/path/to/poster.jpg', release_date: '2024-01-01' }] })
      })
    );

    render(<Home />);

    expect(screen.getByText(/Loading movies.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Test Movie/i)).toBeInTheDocument();
      // Ensure the loading indicator is no longer present
      expect(screen.queryByText(/Loading movies.../i)).not.toBeInTheDocument();
    });
  });

  test('displays loading indicator while fetching data', async () => {
    global.fetch = jest.fn(() =>
      new Promise(resolve => setTimeout(() => resolve({
        json: () => Promise.resolve({ results: [] })
      }), 1000))
    );

    render(<Home />);

    expect(screen.getByText(/Loading movies.../i)).toBeInTheDocument();

    // Await the timeout to ensure loading state is properly transitioned
    await waitFor(() => {
      // Ensure that the loading indicator is no longer present after fetching
      expect(screen.queryByText(/Loading movies.../i)).not.toBeInTheDocument();
    }, { timeout: 1500 }); // Adjust the timeout if necessary
  });

  test('displays error message when API call fails', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Failed to fetch'))
    );

    render(<Home />);

    expect(screen.getByText(/Loading movies.../i)).toBeInTheDocument();

    await waitFor(() => {
      // Ensure that the error message is displayed
      expect(screen.getByText(/Error occurred while fetching movies./i)).toBeInTheDocument();
    });
  });
});
