import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn'); // Or use any other method to check authentication

    if (!isLoggedIn) {
      router.push('/login'); // Redirect to login page if not authenticated
    }
  }, [router]);

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {/* Dashboard content goes here */}
    </div>
  );
}
