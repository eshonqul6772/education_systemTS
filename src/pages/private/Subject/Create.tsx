import React, {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {BiErrorAlt} from 'react-icons/bi'
import {AiOutlineSave} from 'react-icons/ai'
import {Select} from 'antd'


import SubjectService from 'services/subject.service'

import Button from 'components/Button'
import Input from 'components/Input'

import './Subject.scss'

const Create: React.FC = () => {
  const navigate = useNavigate()

  const schema = Yup.object().shape({
    name: Yup.string().min(3).required(),
    status: Yup.mixed().oneOf(['ACTIVE', 'INACTIVE']).required(),
  })
  const handleOnSubmit = (values?: any) => {
    const subject = Object.keys(values)
      .map((key) => values[key])
      .join('')

    SubjectService.create(formik.values)
      .then(res => {
        console.log(res.data)
        navigate('/subject')
      })
      .catch(err => {
        console.log(err.data)
      })
  }

  const formik = useFormik({
    initialValues: {
      status: '',
      name: '',
    },
    validationSchema: schema,
    onSubmit: handleOnSubmit,
  })

  const setInputValue = useCallback(
    (key: string, value: any) =>
      formik.setValues({
        ...formik.values,
        [key]: value,
      }),
    [formik],
  )

  return (
    <>
      <div className='operation__top'>
        <Button
          onClick={() => navigate('/subject')}
          className='fs-5'
          prefixIcon={<BiErrorAlt size='25px'/>}
          title='cencle'
          variant='neutral'
        />

        <Button
          className='fs-5'
          prefixIcon={<AiOutlineSave size='25px'/>}
          onClick={formik.handleSubmit}
          title='save'
          variant='success'
        />
      </div>

      <div className='table__box'>
        <form>
          <Input
            className='add__input'
            label='subject_name'
            placeholder='Enter subject'
            value={formik.values.name}
            name='subject'
            onChange={(e: any) => setInputValue('name', e)}
            state={formik.errors.name && 'error'}
            message={formik.errors.name}
            
          />

          <Select
            defaultValue='ACTIVE'
            style={{inlineSize: 373}}
            onSelect={(e?: any) => setInputValue('status', e)}
            options={[
              {value: 'ACTIVE', label: 'ACTIVE'},
              {value: 'INACTIVE', label: 'INACTIVE'},
            ]}
          />
        </form>
      </div>
    </>
  )
}
export default Create
