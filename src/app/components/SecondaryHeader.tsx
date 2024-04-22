'use client';
import React, { useEffect, useState } from 'react';
import Breadcrumb from './Breadcrumb';
import { Dropdown } from './ui/Dropdown';
import { roles } from '../lib/dummy-data';
import { Button } from './ui/Button';
import { useRouter, useSearchParams } from 'next/navigation';

const SecondaryHeader = () => {
  const router = useRouter();
  const Params = useSearchParams();
  const searchParams = Params.get('term') ?? '';
  const [term, setTerm] = useState(searchParams);
  const [role, setRole] = useState(roles[0].value);

  useEffect(() => {
    setTerm(searchParams); // Update term when searchParams change
  }, [searchParams]);

  const onSearch = (e: any) => {
    e.preventDefault();
    if (!role) {
      return;
    } else {
      router.push(`/find-developers?term=${term}&roles=${role}`);
    }
  };

  const formattedRoles = roles.map((role) => ({
    ...role,
    name: `${role.name} in`,
  }));

  return (
    <div className="relative z-10 bg-blue py-2.5 md:py-5">
      <div className="container flex flex-col gap-2.5 md:flex-row md:justify-between md:items-center">
        <Breadcrumb className="text-white" />
        <form
          onSubmit={onSearch}
          className="flex flex-col md:flex-row md:border md:border-white md:rounded-md"
        >
          <Dropdown
            onSelection={(val) => setRole(val.value)}
            options={formattedRoles}
          />
          <div className="flex">
            <input
              onChange={(e) => setTerm(e.target.value)}
              className="p-2 w-full"
              type="text"
              value={term}
            />
            <Button type="submit" variant="blue">
              Search
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SecondaryHeader;
