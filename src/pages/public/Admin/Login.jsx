import React, { useState }  from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input } from 'antd';

import { login } from '../../../reducers/actions/auth';

import Logo from '../../../assets/imgs/muazacademy.png';
import IMg from '../../../assets/imgs/muazacademy2.png';

import './Login.scss';

const AdminLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [values, setValues] = useState({
      username: '',
      password: '',
    });
  
    const handleInputChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      dispatch(login(values.username, values.password))
        .then(res => {
          navigate('/dashbaord');
        })
        .catch(err => {
          console.log(err);
        });
    };

    return (
        <>
            <div>
                <div className="containers">
                    <div className="choose__stafe">
                        <div>
                            <div style={{marginBottom: '150px'}}>
                                <img style={{width: '250px', height: '60px'}} src={Logo} alt={'logo'}/>
                            </div>

                            <div className="choose__link-box">
                                <h2 style={{marginBottom: '20px', color: 'black'}}>ADMIN</h2>
                                <form onSubmit={handleSubmit} action="">
                                    <h3 style={{fontSize: '20px', marginBottom: '20px', color: 'black'}}>
                                        Enter your credentials to login
                                    </h3>

                                    <div className="form__box">
                                        <Input
                                            type="text"
                                            name="username"
                                            placeholder="login"
                                            value={values.username}
                                            onChange={handleInputChange}
                                        />

                                        <Input.Password
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={values.password}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <button className="btn__submit" type="submit">
                                        login
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="home-img">
                            <img className="baner__img" src={IMg} alt={'img'}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminLogin
