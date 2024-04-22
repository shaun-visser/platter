'use client';
import { useAppContext } from '../context';
import { UserInfo } from '../lib/definitions';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { roles, skills } from '../lib/dummy-data';
import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
  const { data } = useAppContext();
  const userData = useMemo(() => (data?.results ? data.results : []), [data]);
  const router = useRouter();
  const Params = useSearchParams();
  const roleParams = Params.get('roles') ?? '';
  const skillParams = Params.get('skills') ?? '';
  const searchParams = Params.get('term') ?? '';
  const page = Params.get('page') ?? '1';
  const [selectedRoles, setSelectedRoles] = useState<string[]>(
    roleParams ? roleParams?.split(',') : []
  );
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    skillParams ? skillParams?.split(',') : []
  );
  const [filteredData, setFilteredData] = useState<UserInfo[]>([]);

  useEffect(() => {
    const updatedFilteredData = userData?.filter((u: UserInfo) => {
      // If no roles or skills are selected, return true to include all developers
      if (
        selectedRoles?.length === 0 &&
        selectedSkills?.length === 0 &&
        !searchParams
      )
        return true;

      // Check if the developer's role matches any of the selected roles
      const roleMatch =
        selectedRoles?.length === 0 ||
        selectedRoles.some(
          (selectedRole) =>
            u.role.replaceAll(' ', '-').toLowerCase() ===
            selectedRole.toLowerCase()
        );

      // Check if the developer's skills match any of the selected skills
      const skillMatch =
        selectedSkills?.length === 0 ||
        selectedSkills.every((selectedSkill) =>
          u.skill
            .replaceAll(' ', '-')
            .toLowerCase()
            .includes(selectedSkill.toLowerCase())
        );

      // Check if the developer's location matches the search term
      const locationMatch =
        u.location.street.name.toLowerCase() === searchParams.toLowerCase() ||
        u.location.city.toLowerCase() === searchParams.toLowerCase() ||
        u.location.state.toLowerCase() === searchParams.toLowerCase() ||
        u.location.country.toLowerCase() === searchParams.toLowerCase() ||
        u.location.postcode === searchParams;

      return roleMatch && skillMatch && (locationMatch || !searchParams);
    });

    setFilteredData(updatedFilteredData);
  }, [userData, selectedRoles, selectedSkills, searchParams]);

  const handleRoleChange = (roleValue: string) => {
    const updatedRoles = selectedRoles.includes(roleValue)
      ? selectedRoles.filter((selectedRole) => selectedRole !== roleValue)
      : [...selectedRoles, roleValue];
    setSelectedRoles(updatedRoles);

    const updatedRoleParams = updatedRoles.join(',');
    router.push(`?term=${searchParams}&roles=${updatedRoleParams}`);
  };

  const handleSkillChange = (skillValue: string) => {
    const updatedSkills = selectedSkills?.includes(skillValue)
      ? selectedSkills.filter((selectedSkill) => selectedSkill !== skillValue)
      : [...selectedSkills, skillValue];
    setSelectedSkills(updatedSkills);
    router.push(
      `?term=${searchParams}&roles=${selectedRoles.join(
        ','
      )}&skills=${updatedSkills.join(',')}`
    );
  };

  const nextPage = Number(page) + 1;
  const prevPage = Number(page) > 1 ? Number(page) - 1 : 1;

  const generateTitle = (roles: string[], term: string): string => {
    // Join selected roles with commas if there is more than one
    const roleText = roles?.length > 1 ? roles.join(', ') : roles[0];
    return `Top ${roleText ? roleText.replaceAll('-', ' ') : 'developer'}s ${
      term?.length > 0 ? `in ${term}` : ''
    }`;
  };

  const title = generateTitle(selectedRoles, searchParams);

  return (
    <div className="container grid grid-cols-1 md:grid-cols-12 md:gap-4 mb-8">
      <aside className="md:col-span-4">
        <div className="bg-white px-1.5 py-2.5 lg:px-4">
          <Disclosure defaultOpen>
            {({ open }) => (
              <>
                <Disclosure.Button className="py-2 font-bold text-xl flex items-center justify-between w-full">
                  <p>Developer types:</p>
                  {open ? (
                    <ChevronUp size={30} strokeWidth={2} color="#0f747e" />
                  ) : (
                    <ChevronDown size={30} strokeWidth={2} color="#0f747e" />
                  )}
                </Disclosure.Button>
                <Disclosure.Panel className="grid grid-cols-1 gap-y-2.5 divide-y divide-green-400">
                  <div className="grid col-span-1 grid-cols-2 gap-2.5 justify-around md:grid-cols-1 lg:grid-cols-2 lg:gap-x-1">
                    {roles.map((roleItem: any, index: number) => (
                      <label
                        key={`${roleItem.name}-${index}`}
                        className="text-xs"
                      >
                        <input
                          type="checkbox"
                          className="accent-green"
                          checked={selectedRoles?.includes(roleItem.value)}
                          onChange={() => handleRoleChange(roleItem.value)}
                        />{' '}
                        {roleItem.name}
                      </label>
                    ))}
                  </div>
                  <div className="grid col-span-1 grid-cols-3 gap-2.5 md:grid-cols-2 font-bold text-xl w-full py-2">
                    <p className="col-span-3">Skills:</p>
                    {skills.map((skill: any) => (
                      <label
                        key={skill.id}
                        className="font-normal md:col-span-1 text-xs"
                      >
                        <input
                          type="checkbox"
                          className="accent-green"
                          checked={selectedSkills?.includes(skill.value)}
                          onChange={() => handleSkillChange(skill.value)}
                        />{' '}
                        {skill.name}
                      </label>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </aside>
      {filteredData?.length > 0 ? (
        <>
          <ul
            role="list"
            className="flex flex-col md:col-start-5 md:col-span-8"
          >
            <h1 className="mt-7 mb-2 font-bold text-3xl">{title}</h1>
            {filteredData
              ?.slice((Number(page) - 1) * 10, Number(page) * 10)
              .map((u: UserInfo, i: number) => (
                <li
                  key={`${u.id.value}-${i}`}
                  className="bg-white grid mb-8 last:mb-0 grid-cols-12 gap-5 p-1.5 md:p-5 border border-gray-300"
                >
                  <div className="relative aspect-square w-full bg-slate border border-gray-600 col-span-3 flex items-center justify-center md:col-span-2">
                    <div className="relative w-full h-full md:w-[calc(100%-12px)] md:h-[calc(100%-12px)]">
                      <Image
                        src={u.picture.large}
                        alt="profile"
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="col-span-9 md:col-span-7">
                    <p className="font-bold text-lg">
                      {u.name.first} {u.name.last}
                    </p>
                    <p className="text-sm font-medium text-gray">{u.skill}</p>
                    <p className="block text-sm font-medium">{u.role}</p>
                    <p className="block text-sm font-medium">{u.intro}</p>
                  </div>
                  <Link
                    href={`/find-developers/${u.id.value}`}
                    className="text-center col-span-12 text-blue block rounded-md border border-gray px-4 py-2.5 md:col-span-3 md:mb-auto"
                  >
                    View Profile
                  </Link>
                </li>
              ))}
            {filteredData?.length > 10 && (
              <div className="flex justify-center">
                {Number(page) > 1 && (
                  <Link
                    href={{
                      pathname: '/find-developers',
                      query: {
                        searchParams,
                        selectedRoles,
                        selectedSkills,
                        page: prevPage,
                      },
                    }}
                    className="bg-white text-blue px-4 py-2.5 border border-gray"
                  >
                    Previous
                  </Link>
                )}
                {Number(page) * 10 < filteredData?.length && (
                  <Link
                    href={{
                      pathname: '/find-developers',
                      query: {
                        searchParams,
                        selectedRoles,
                        selectedSkills,
                        page: nextPage,
                      },
                    }}
                    className="bg-white text-blue px-4 py-2.5 border border-gray"
                  >
                    Next
                  </Link>
                )}
              </div>
            )}
          </ul>
        </>
      ) : (
        <h1 className="mt-7 mb-2 font-bold text-3xl md:col-span-8">
          No results found.
        </h1>
      )}
    </div>
  );
};

export default Page;
