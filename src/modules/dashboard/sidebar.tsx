'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

const Sidebar = () => {

  const pathName = usePathname();

  const sideBars = [
    {
      'name': 'Dashboard',
      'href': '/dashboard',
    },
    {
      'name': 'TechStacks',
      'href': '/dashboard/techstack',
    },
    {
      'name': 'Projects',
      'href': '/dashboard/project',
    },
    {
      'name': 'Employment history',
      'href': '/dashboard/employment-history',
    }
  ];

  const settins = [
    {
      name: 'Logout',
      href: '/auth/logout'
    },
    {
      name: 'Change password',
      href: '/auth/change-password'
    }
  ];

  return (
    <div className="col-span-2 bg-white rounded-2xl relative">
      <h1 className="font-bold p-8">JDEV</h1>
      <hr className="h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent border-none" />
      <ul className="mt-24 flex flex-col gap-1">
        {sideBars.map(({ name, href }, index) => {
          const activeLink = pathName === href ? 'bg-indigo-50' : '';
          return (
            <li key={`${index}-${name}`} className="w-full">
              <Link href={href} className={twMerge('px-4 py-3 text-sm flex mx-4 rounded-lg cursor-pointer hover:bg-indigo-50', activeLink)}>{name}</Link>
            </li>
          );
        })}
      </ul>

      <div className='absolute bottom-32'>
        <hr className="h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent border-none mt-12" />
        <ul className="mt-12 flex flex-col gap-1">
          {settins.map(({ name, href }, index) => {
            const activeLink = pathName === href ? 'bg-indigo-50' : '';
            return (
              <li key={`${index}-${name}`} className="w-full">
                <Link href={href} className={twMerge('px-4 py-3 text-sm flex mx-4 rounded-lg cursor-pointer hover:bg-indigo-50', activeLink)}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;