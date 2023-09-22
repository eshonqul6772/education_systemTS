import React  from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Dropdown } from 'antd'
import { LiaUserCircleSolid } from 'react-icons/lia'
import { FiLogOut, FiSettings } from 'react-icons/fi'
import {RxHamburgerMenu} from 'react-icons/rx'


import useAuth from 'reducers/hooks'

import { LOGOUT } from 'reducers/types'

import './Navbar.scss'

const Navbar:React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { firstName } = useAuth()

  const handleLogout = () => {
    navigate('/')
    dispatch({ type: LOGOUT })
  }

  const items = [
    {
      key: '1',
      label: (
        <button className='navbar__logout' onClick={() => navigate('/user')}>
          <LiaUserCircleSolid size='30px' />
          {firstName}
        </button>
      ),
    },
    {
      key: '2',
      label: (
        <button className='navbar__logout' onClick={handleLogout}>
          <FiLogOut size='30px' color='red' />
          Logout
        </button>
      ),
    },
  ]

  return (
    <div className='navbar'>
      <div className='navbar__content'>

        <button className='menu__icon'>
          <RxHamburgerMenu size='30px' color='white'/>
        </button>

        <div>
          <Dropdown
            overlayStyle={{ inlineSize: '200px', zIndex: '100000' }}
            menu={{
              items,
            }}
            placement='bottomLeft'
            arrow
            trigger={['click']}
          >
            <Button className='navbar__btn'>
              <FiSettings size='40px' />
            </Button>
          </Dropdown>
        </div>

      </div>
    </div>
  )
}

export default Navbar
