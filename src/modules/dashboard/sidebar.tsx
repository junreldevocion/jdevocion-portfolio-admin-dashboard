'use client';

import { handleLogout } from '@/src/app/dashboard/actions';
import { BorderLine } from '@/src/components/BorderLine';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';
import { SidebarIcons } from '@/src/icons/SidebarIcons';

const Sidebar = () => {
  const pathName = usePathname();

  const [activeMenuBar, setActiveMenuBar] = useState<string>(pathName);

  const sidebarLinks = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      iconLeft: SidebarIcons.TbLayoutDashboardFilled,
      iconRight: SidebarIcons.RxChevronDown,
      children: [
        {
          name: 'TechStacks',
          href: '/dashboard/techstack',
        },
        {
          name: 'Projects',
          href: '/dashboard/project',
        },
        {
          name: 'Employment history',
          href: '/dashboard/employment-history',
        }
      ]
    }
  ];

  const handleActiveMenuBar = (href: string) => {
    if (activeMenuBar === href) {
      setActiveMenuBar('');
    } else {
      setActiveMenuBar(href);
    }
  };

  return (
    <div className="col-span-12 md:col-span-3 lg:col-span-2 bg-white border-r border-gray-200 h-full">
      <h1 className="font-bold p-8">JDEV</h1>
      <BorderLine />
      <ul className="mt-8 flex flex-col gap-1">
        {sidebarLinks.map(({ name, href, children, iconLeft, iconRight }, index) => {
          const activeLink = pathName.includes(href) ? 'bg-indigo-50' : '';
          const activeMenu = !!activeMenuBar.includes(href);
          return (
            <li key={`${index}-${name}`} className="w-full" >
              <Link href={href} className={twMerge('relative px-4 py-3 text-sm flex  gap-2 mx-4 rounded-lg cursor-pointer hover:bg-indigo-50 items-center text-indigo-400', activeLink)}>
                <span>{iconLeft}</span>
                {name}
                <span className={twMerge('absolute right-4', activeMenu ? 'rotate-180' : 'rotate-0')} onClick={(e) => { e.preventDefault(); handleActiveMenuBar(href); }}>{iconRight}</span>
              </Link>
              {children && (
                <ul className={twMerge('flex flex-col gap-1 pl-8 pr-4 w-full mt-2 ', activeMenu ? 'block' : 'hidden')}>
                  {children.map(({ name: childName, href: childHref }, childIndex) => {
                    const activeChildLink = pathName.includes(childHref) ? 'bg-indigo-50 text-indigo-400' : '';
                    return (
                      <li key={`${childIndex}-${childName}`}>
                        <Link href={childHref} className={twMerge('px-4 py-3 text-sm flex rounded-lg cursor-pointer hover:bg-indigo-50', activeChildLink)}>{childName}</Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      <BorderLine />
      <div className="mt-8 mx-4">
        <form className='w-full hover:bg-indigo-50 rounded-lg flex items-center hover:text-indigo-400' action={handleLogout}>
          <button type="submit" className='w-full px-4 py-3 text-sm flex cursor-pointer items-center gap-2'>{SidebarIcons.CiUser}Logout</button>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;