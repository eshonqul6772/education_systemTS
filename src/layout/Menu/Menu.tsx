import React, {ReactNode} from 'react'
import {NavLink, Link} from 'react-router-dom';
import {AiOutlineTeam, AiOutlineDashboard} from 'react-icons/ai';
import {PiStudentBold} from 'react-icons/pi';
import {MdGroups2, MdOutlineSubject} from 'react-icons/md';
import {LiaUserCircleSolid} from 'react-icons/lia';
import {BsFillClipboard2DataFill} from 'react-icons/bs';


import useAuth from 'reducers/hooks';

import './Menu.scss';

import Logo from 'assets/imgs/muazacademy.png';


enum ROLE {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
}

interface IMenu {
  accessRoles: ROLE[];
  path: string;
  label: string;
  icon: ReactNode;
  hidden: boolean
}

const Menu = () => {
  const {role} = useAuth()

  const menus: IMenu[] = [
    {
      accessRoles: [ROLE.ADMIN, ROLE.STUDENT, ROLE.STUDENT],
      path: '/dashboard',
      label: 'Dashboard',
      icon: <AiOutlineDashboard size='30px'/>,
      hidden: false
    },
    {
      accessRoles: [ROLE.ADMIN],
      path: '/user',
      label: 'User',
      icon: <LiaUserCircleSolid size='30px'/>,
      hidden: false
    },
    {
      accessRoles: [ROLE.ADMIN],
      path: '/teacher',
      label: 'Teacher',
      icon: <AiOutlineTeam size='30px'/>,
      hidden: false
    },
    {
      accessRoles: [ROLE.ADMIN],
      path: '/group',
      label: 'Group',
      icon: <MdGroups2 size='30px'/>,
      hidden: false
    },
    {
      accessRoles: [ROLE.ADMIN],
      path: '/student',
      label: 'Student',
      icon: <PiStudentBold size='30px'/>,
      hidden: false
    },
    {
      accessRoles: [ROLE.ADMIN],
      path: '/subject',
      label: 'Subject',
      icon: <MdOutlineSubject size='30px'/>,
      hidden: false
    },

    {
      accessRoles: [ROLE.ADMIN],
      path: '/resources',
      label: 'Resources',
      icon: <BsFillClipboard2DataFill size='30px'/>,
      hidden: true
    },

    {
      accessRoles: [ROLE.ADMIN],
      path: '/resourcesList',
      label: 'resourcesList',
      icon: <BsFillClipboard2DataFill/>,
      hidden: false
    },
  ];

  return (
    <div className='menu'>
      <ul className='menu__list'>
        <div className='menu__list-logo'>
          <Link className='menu__logo border-bottom border-dark' to=''>
            <img src={Logo} alt={Logo} style={{inlineSize: '150px', blockSize: '50px'}}/>
          </Link>
        </div>

        {
          menus.filter((item) => item.accessRoles.includes(role))
            .map(({path, icon, label, hidden}) => {
              return (
                !hidden && (
                  <li className='menu__list-item' key={path}>
                    <NavLink to={path} className='menu__link'>
                      {icon} {label}
                    </NavLink>
                  </li>
                )
              )

            })
        }
      </ul>
    </div>
  )
}

export default Menu
