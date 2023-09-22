import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { BiErrorAlt } from 'react-icons/bi'
import { AiOutlineSave } from 'react-icons/ai'
import { Select } from 'antd'

import GroupServices from 'services/group.service'
import getSubject from 'services/subject.service'

import { IIdAndName } from 'helpers/interface'

import Button from 'components/Button'
import Input from 'components/Input'


const Create: React.FC = () => {
  const navigate = useNavigate()

  const [items, setItems] = useState<IIdAndName[]>([])

  const schema = Yup.object().shape({
    name: Yup.string().min(3).required(),
    status: Yup.mixed().oneOf(['ACTIVE', 'INACTIVE']).required(),
  })
  const handleOnSubmit = (values?: any) => {
    const subject = Object.keys(values)
      .map((key) => values[key])
      .join(' ')

    GroupServices.create(formik.values)
      .then((res) => {
        navigate('/group')
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      subject_id:'',
      status: 0,

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

  useEffect(() => {
    getSubject.getAll().then((res) => {
      setItems(res.data)
    })
  }, [])

  console.log(formik.values)

  return (
    <>
      <div className='operation__top'>
        <Button
          onClick={() => navigate('/group')}
          prefixIcon={<BiErrorAlt size='25px' />}
          title='cencle'
          variant='neutral'
        />

        <Button
          prefixIcon={<AiOutlineSave size='25px' />}
          onClick={formik.handleSubmit}
          title='save'
          variant='success'
        />
      </div>

      <div className='table__box'>
          <Input
            label='subject_name'
            placeholder='Enter subject'
            value={formik.values.name}
            name='subject'
            onChange={(e: any) => setInputValue('name', e)}
            state={formik.errors.name && 'error'}
            message={formik.errors.name}
          />

          <div style={{display:'flex', justifyContent:'space-between', flexDirection:'column', marginBottom:'10px' }}>
            <label className='form__category-lable'>subject</label>
            <Select
              size='large'
              onSelect={(e) => setInputValue('subject_id', e)}
              style={{
                inlineSize: '400px',
              }}
              options={items.map((item:any) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </div>

          <Select
            size='large'
            defaultValue='ACTIVE'
            style={{ inlineSize: '400px' }}
            onSelect={(e?: any) => setInputValue('status', e)}
            options={[
              { value: 'ACTIVE', label: 'ACTIVE' },
              { value: 'INACTIVE', label: 'INACTIVE' },
            ]}
          />

      </div>
    </>
  )
}

export default Create
