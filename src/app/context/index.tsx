'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { roles, skills } from '../lib/dummy-data';
import { ResultData, UserInfo } from '../lib/definitions';

interface AppContextType {
  data: ResultData | undefined;
  setData: React.Dispatch<React.SetStateAction<ResultData | undefined>>;
}

const defaultContextValue: AppContextType = {
  data: undefined,
  setData: () => {},
};

const AppContext = createContext<AppContextType>(defaultContextValue);

export function AppWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let [data, setData] = useState<ResultData>();
  let [limit, setLimit] = useState(30);
  let [page, setPage] = useState(1);
  let [runOnce, setRunOnce] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://randomuser.me/api/?results=${limit}&page=${page}&nat=us`
        );
        const data: ResultData = await response.json();
        const userDataWithRoleAndSkill = data.results.map((user: UserInfo) => {
          // Get a random index for roles and skills
          const randomRoleIndex = Math.floor(Math.random() * roles.length);
          const randomSkillIndex = Math.floor(Math.random() * skills.length);
          // Generate random introduction
          const intro = `Hi, I'm ${user.name.first} ${user.name.last}. I'm a ${roles[randomRoleIndex].name} with expertise in ${skills[randomSkillIndex].name}.`;
          // Generate random copy
          const copy = `${user.name.first} has over 15 years of experience as a ${roles[randomRoleIndex].name} developer, including a #1 ${skills[randomSkillIndex].name} game in 2008 and scaling Yahoo! add servers. ${user.name.first}'s strengths are adaptility, clear communication, and a relentless focus on the details that get projects shipped.`;
          // Generate random work experience
          const experience = [
            {
              title: 'CEO at MobilityDrave (2009 - present)',
              workData: [
                'Developed iOS apps which has been installed on over 15 million devices and RocketScience app was #1 in the App Store in December 2007.',
                'Create other games including RPG TrueMasters',
                'Successfully led a team of 10 engineers in accomplishing the launch of a new product, exceeding sales targets by 20%.',
                'Achieved a 30% reduction in production costs within six months through the implementation of lean manufacturing principles.',
                'Developed and delivered a series of training workshops on project management, resulting in a 25% increase in project completion rates.',
              ],
            },
            {
              title: 'Team Lead at MultiMedia LLC (2004 - 2008)',
              workData: [
                'Led a cross-functional team in the successful integration of a newly acquired company, resulting in a 40% increase in market share.',
                'Negotiated a strategic partnership with a key supplier, resulting in a 15% reduction in procurement costs.',
                'Implemented a new inventory management system that reduced stockouts by 50% and improved inventory turnover by 20%.',
                'Promoted to Senior Manager based on consistent high performance and contributions to the company`s growth.',
                'Demonstrated exceptional leadership skills during a company-wide reorganization, resulting in a smooth transition and minimal disruption to operations.',
              ],
            },
          ];

          const helpWith = [
            'Mobile iOS development',
            'CTO management',
            'Python development',
            'C++ development',
            'Parse.com',
            'Swift',
            'REST API architecture',
          ];

          // Assign the random role and skill to the user
          return {
            ...user,
            role: roles[randomRoleIndex].name,
            skill: skills[randomSkillIndex].name,
            intro,
            experience,
            helpWith,
            copy,
          };
        });

        // Update the data with the user data containing roles and skills
        const updatedData: ResultData = {
          ...data,
          results: userDataWithRoleAndSkill,
        };

        setData(updatedData);
      } catch (error) {
        throw new Error('Failed to fetch data');
      }
    };
    fetchData();
    setRunOnce(true);
  }, [runOnce, limit, page]);

  const contextValue: AppContextType = {
    data: data,
    setData: setData,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
