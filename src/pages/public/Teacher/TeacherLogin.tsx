import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from 'antd';

import Logo from 'assets/imgs/muazacademy.png';
import Img from 'assets/imgs/teacher.jpg';
import { login } from 'reducers/actions/auth';

const TeacherLogin:React.FC = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    userName: '',
    password: '',
  });

  const handleInputChange = (e:any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    dispatch(login(values.userName, values.password))
      .then((res:any) => {
        console.log(res.data)
      })
      .catch((err:any) => {
        console.log(err);
      });
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit} action="">
        <div>
          <img
            style={{ width: '300px', height: '60px' }}
            src={Logo}
            alt={'logo'}
          />
        </div>

        <img
          src={Img}
          alt="img"
          style={{ width: '350px', height: '230px', borderRadius: '15px' }}
        />

        <div className="form__box">
          <Input
            type='text'
            name='userName'
            placeholder='login'
            value={values.userName}
            onChange={handleInputChange}
          />

          <Input.Password
            name='password'
            placeholder='Password'
            value={values.password}
            onChange={handleInputChange}
          />
        </div>
        <button className='btn__submit"'>Login</button>
      </form>
    </div>
  );
};

export default TeacherLogin;
