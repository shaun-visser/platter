'use client';
import Link from 'next/link';
import { Button } from './ui/Button';
import { LogOut } from 'lucide-react';
import React from 'react';

const Header = () => {
  return (
    <header className="container py-2 md:py-5 grid gap-4 w-full md:justify-end bg-white text-blue md:grid-cols-12 md:items-center">
      <nav aria-label="primary menu" className="md:col-span-8">
        <ul className="flex flex-wrap gap-2 md:gap-4 items-center w-full md:justify-end">
          <li>
            <Link href="/find-developers" className="px-2">
              Find Developers
            </Link>
          </li>
          <li>
            <Link href="/resources" className="px-2">
              Resources
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex gap-2 md:col-span-4 md:justify-end">
        <Link href="/sign-up">
          <Button variant="white">Sign up</Button>
        </Link>
        <Link href="/login">
          <Button variant="blue" Icon="logout">
            Login
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
