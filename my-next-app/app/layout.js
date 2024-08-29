import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav className="flex justify-center space-x-4 p-4 bg-gray-200">
            <Link href="/login" className="text-blue-500">
              Login
            </Link>
            <Link href="/dashboard" className="text-blue-500">
              Dashboard
            </Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
