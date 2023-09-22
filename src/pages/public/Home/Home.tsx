import React from 'react';
import {Link} from 'react-router-dom';
import {PiStudentBold} from 'react-icons/pi'
import {AiOutlineTeam} from 'react-icons/ai'

import './Home.scss'
import IMg from 'assets/imgs/muazacademy2.png'
import Logo from 'assets/imgs/muazacademy.png'


const Home:React.FC = () => {
  return (
    <>
      <div>
        <div className='containers'>
          <div className='choose__profile'>
            <div>
              <div style={{marginBottom: '200px'}}>
             <img style={{width:'250px', height:'60px'}} src={Logo} alt={'logo'}/>
              </div>
              <div className='choose__link-box'>
                <h2 >Choose your profile</h2>
                <Link className='choose__link' to='/studentlogin'>
                  <PiStudentBold size='40px'  color='#e3e0e0'/>
                  <div>
                    <span>Student</span>
                    <p>welco to studend login davay bosamiz talabalar</p>
                  </div>
                </Link>
                <br/>
                <Link className='choose__link' to='/staff'>
                  <AiOutlineTeam size='40px' color='#e3e0e0'/>
                  <div>
                    <span>Staff</span>
                    <p>welcom to goo Satf page ketu ukalar</p>
                  </div>
                </Link>
              </div>
            </div>

            <div className='home-img'>
              <img className='baner__img'  src={IMg} alt={'img'}/>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Home;
