import React, {useCallback, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {BiErrorAlt} from 'react-icons/bi';
import {AiOutlineSave} from 'react-icons/ai';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Select} from 'antd';

import StudentService from 'services/student.service';
import GetSubject from 'services/subject.service';

import {IIdAndName, IPerson} from 'helpers/interface';

import Button from 'components/Button';
import Input from 'components/Input';

import './Student.scss';

const Create: React.FC = () => {
  const navigate = useNavigate()

  const [subject, setSubject] = useState<IIdAndName[]>([])

  // const phoneRegExp =  /^9989[012345789][0-9]{7}$/

  const schema = Yup.object()
    .shape({
      firstName: Yup.string().min(3).required(),
      lastName: Yup.string().min(3).required(),
      phone: Yup.string().min(3).required(),
      // .matches(phoneRegExp, 'Phone number is not valid'),
      username: Yup.string().min(3).required(),
      password: Yup.string().min(3).required(),
      subject: Yup.array().min(1).required(),
      status: Yup.mixed().oneOf(['ACTIVE', 'INACTIVE']).required()
    });

  const handleOnSubmit = (values?: any) => {
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      username: values.username,
      password: values.password,
      subjects_ids: values.subject,
      status: values.status
    }

    StudentService.create(data)
      .then(res => {
        console.log(res.data)
        navigate('/student')
      })
      .catch(err => {
        console.log(err.data)
      })
  };

  const formik = useFormik<IPerson>({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      username: '',
      password: '',
      subject: [],
      status: 'ACTIVE',
    },
    validationSchema: schema,
    onSubmit: handleOnSubmit,
  });

  console.log(formik.values)


  const setInputValue = useCallback(
    (key: string, value: any) =>
      formik.setValues({
        ...formik.values,
        [key]: value,
      }),
    [formik]
  );


  useEffect(() => {
    GetSubject.getAll().then((res) => {
      setSubject(res.data)
    })
  }, [])

  return (
    <>
      <div className='operation__top'>
        <Button
          onClick={() => navigate('/student')}
          prefixIcon={<BiErrorAlt size='25px'/>}
          title='cencle'
          variant='neutral'
        />

        <Button
          prefixIcon={<AiOutlineSave size='25px'/>}
          onClick={formik.handleSubmit}
          title='save'
          variant='success'
        />
      </div>

      <div className='table__box'>

        <div className='form__list'>

          <div>
            <Input
              label='firs_name'
              placeholder='Enter first name'
              value={formik.values.firstName}
              name='firstName'
              onChange={(e: any) => setInputValue('firstName', e)}
              state={formik.errors.firstName && 'error'}
              message={formik.errors.firstName}
            />
          </div>

         <div>
           <Input
             label='last_name'
             placeholder='Enter last name'
             value={formik.values.lastName}
             name='lastName'
             onChange={(e: any) => setInputValue('lastName', e)}
             state={formik.errors.lastName && 'error'}
             message={formik.errors.lastName}
           />
         </div>

          <div>
            <Input
              label='phone number'
              placeholder='Enter phone number'
              value={formik.values.phone}
              name='phone number'
              onChange={(e: any) => setInputValue('phone', e)}
              state={formik.errors.phone && 'error'}
              message={formik.errors.phone}
            />
          </div>

         <div>
           <Input
             label='username'
             placeholder='Enter subject'
             value={formik.values.username}
             name='username'
             onChange={(e: any) => setInputValue('username', e)}
             state={formik.errors.username && 'error'}
             message={formik.errors.username}
           />
         </div>

          <div>
            <Input
              label='password'
              placeholder='Enter password'
              value={formik.values.password}
              name='password'
              onChange={(e: any) => setInputValue('password', e)}
              state={formik.errors.password && 'error'}
              message={formik.errors.password}
            />
          </div>

          <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
            <label>
              teacher_subjects
            </label>
            <Select
                    onChange={(e: any) => setInputValue('subject', e)}
                    mode='tags'
                    size='large'
                    style={{
                      inlineSize: '400px',

                    }}
                    placeholder='Tags Mode'
                    options={subject.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Create
