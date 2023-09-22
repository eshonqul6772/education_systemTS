import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';

import { login } from 'reducers/actions/auth';

import Input from 'components/Input'

import Img from 'assets/imgs/teacher.jpg';
import Logo from 'assets/imgs/muazacademy.png';

import './StudentLogin.scss';

const schema = Yup.object().shape({
  email: Yup.string()
    .required('Email is a required field')
    .email('Invalid email format'),
  password: Yup.string()
    .required('Password is a required field')
    .min(8, 'Password must be at least 8 characters'),
});

interface ILogin {
  username:string;
  password:string;
}

const StudentLogin:React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState<ILogin>({
    username: '',
    password: '',
  });

  const handleInputChange = (e:any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    dispatch(login(values.username, values.password))
      .then((res: any) => {
        navigate('/user');
        console.log(res);
      })
      .catch((err:any) => {
        toast.error('USERNAME_OR_PASSWORD_INCORRECT')
        console.log(err);
      });
  };

  return (
    <>
      <div className='wrapper'>
        <Toaster
          position='top-center'
          reverseOrder={true}
          toastOptions={{
            className: 'toast',
            style: {
              display: 'flex',
              border: '1px solid #713200',
              width: '800px',
            },
          }}
        />`
        <Formik
          validationSchema={schema}
          initialValues={{email: '', password: ''}}
          onSubmit={(values) => {
            alert(JSON.stringify(values));
          }}


        >
          {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
            <div className='login'>
              <div className='form'>
                <form noValidate onSubmit={handleSubmit}>
                    <div>
                      <img
                        style={{ inlineSize: '300px', blockSize: '60px' }}
                        src={Logo}
                        alt='logo'
                      />
                    </div>

                    <img
                      src={Img}
                      alt='img'
                      style={{
                        inlineSize: '350px',
                        blockSize: '230px',
                        borderRadius: '15px',
                      }}
                    />

                  <input
                    type='email'
                    name='email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    defaultValue={values.password}
                    placeholder="Enter email id / username"
                    id="email"
                  />
                  <p className="error">
                    {errors.password && touched.password && errors.password}
                  </p>

                  <input
                    type='password'
                    name='password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Enter password"
                  />
                  <p className="error">
                    {errors.password && touched.password && errors.password}
                  </p>
                  <button className="btn__submit">Login</button>
                </form>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
};

export default StudentLogin;
