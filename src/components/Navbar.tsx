'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                EvoCraft
              </span>
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/' ? 'bg-gray-800' : 'hover:bg-gray-700'
              }`}
            >
              Home
            </Link>
            <Link
              href="/simulator"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/simulator' ? 'bg-gray-800' : 'hover:bg-gray-700'
              }`}
            >
              Start Over
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 