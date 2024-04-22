import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface BreadCrumbProps {
  className?: string;
}

const Breadcrumb = ({ className = '' }: BreadCrumbProps) => {
  return (
    <nav aria-label="breadcrumb menu" className={`${className}`}>
      <ul className="flex gap-1.5">
        <li className="flex items-center">
          <p>Home</p>
          <ChevronRight size={14} color="yellow" />
        </li>

        <li>
          <Link href="/find-developers" className="underline">
            Find Developers
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Breadcrumb;
