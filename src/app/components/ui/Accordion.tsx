'use client';
import { roles as rolesData, skills as skillsData } from '@/app/lib/dummy-data';
import { Disclosure } from '@headlessui/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

interface AccordionProps {
  roles: string;
  skills: string;
  term: string;
}

const Accordion = ({ roles, skills, term }: AccordionProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const roleParams = searchParams.get('roles') ?? 'full-stack-developer';
  const skillParams = searchParams.get('skills') ?? '';

  const [selectedRoles, setSelectedRoles] = useState<string[]>(
    roleParams ? roleParams?.split(',') : []
  );
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    skillParams ? skillParams?.split(',') : []
  );

  const handleRoleChange = (roleValue: string) => {
    const updatedRoles = selectedRoles?.includes(roleValue)
      ? selectedRoles.filter((selectedRole) => selectedRole !== roleValue)
      : [...selectedRoles, roleValue];
    setSelectedRoles(updatedRoles);
    router.push(`?term=${term}&roles=${updatedRoles.join(',')}`);
  };
  const handleSkillChange = (skillValue: string) => {
    const updatedSkills = selectedSkills?.includes(skillValue)
      ? selectedSkills.filter((selectedSkill) => selectedSkill !== skillValue)
      : [...selectedSkills, skillValue];
    setSelectedSkills(updatedSkills);
    router.push(
      `?term=${term}&roles=${selectedRoles.join(
        ','
      )}&skills=${updatedSkills.join(',')}`
    );
  };

  return (
    <div className="bg-white px-1.5 py-2.5 lg:px-4">
      <Disclosure>
        {({ open }) => (
          /* Use the `open` state to conditionally change the direction of an icon. */
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
                {rolesData.map((roleItem: any) => (
                  <label key={roleItem.id} className="text-xs">
                    <input
                      type="checkbox"
                      className="accent-green"
                      checked={roles?.includes(roleItem.value)}
                      onChange={() => handleRoleChange(roleItem.value)}
                    />{' '}
                    {roleItem.name}
                  </label>
                ))}
              </div>
              <div className="grid col-span-1 grid-cols-3 gap-2.5 md:grid-cols-2 font-bold text-xl w-full py-2">
                <p className="col-span-3">Skills:</p>
                {skillsData.map((skill: any) => (
                  <label
                    key={skill.id}
                    className="font-normal md:col-span-1 text-xs"
                  >
                    <input
                      type="checkbox"
                      className="accent-green"
                      checked={skills?.includes(skill.value)}
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
  );
};

export default Accordion;
