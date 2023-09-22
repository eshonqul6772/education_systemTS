import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import Input from 'components/Input'
import {Select} from 'antd'
import {BiErrorAlt} from 'react-icons/bi'
import {AiOutlineSave} from 'react-icons/ai'

import {IIdAndName, IPerson} from 'helpers/interface'

import TeacherService from 'services/teacher.service'
import getSubject from 'services/subject.service'

import Button from 'components/Button'

import '../Student/Student.scss'


const EditStudent: React.FC = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const [subjects, setSubject] = useState<IIdAndName[]>([])

  const [values, setValues] = useState<IPerson>({
    firstName: '',
    lastName: '',
    username: '',
    subject: [],
    phone: '',
    status: 'ACTIVE',
  })

  const handleSubmit = (evt: any) => {
    evt.preventDefault()

    TeacherService
      .update(id, values)
      .then((res) => {
        console.log(res.data)
        navigate('/teacher')
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    TeacherService
      .getTeacher(id)
      .then(res => {
        const {firstName, lastName, phone, username, password, subject, status} = res.data

        setValues({
          firstName,
          lastName,
          phone,
          username,
          password,
          subject,
          status,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }, [id])

  useEffect(() => {
    getSubject
      .getAll()
      .then((res) => {
        setSubject(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>

      <div className='operation__top'>
        <Button
          onClick={() => navigate('/teacher')}
          prefixIcon={<BiErrorAlt size='25px'/>}
          title='cencle'
          variant='neutral'
        />

        <Button
          onClick={handleSubmit}
          prefixIcon={<AiOutlineSave size='25px'/>}
          title='save'
          variant='success'
        />
      </div>

      <div className='table__box'>

        <div className='form__list'>

          <div>
            <Input
              label='first_name'
              value={values.firstName}
              onChange={(e) => setValues({...values, firstName: e})}
              type='text'
              placeholder='first_name'
            />
          </div>

          <div>
            <Input
              label='last_name'
              value={values.lastName}
              className='form-control'
              onChange={(e) => setValues({...values, lastName: e})}
              type='text'
              placeholder='last_name'
            />
          </div>

          <div>
            <Input
              label='phone'
              value={values.phone}
              onChange={(e) => setValues({...values, phone: e})}
              type='text'
              placeholder='phone'
            />
          </div>

          <div>
            <Input
              label='username'
              value={values.username}
              onChange={(e) => setValues({...values, username: e})}
              type='text'
              placeholder='username'
            />

          </div>


          <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
            <label className='form__category-lable'>
              teacher_subjects
            </label>
            <Select
              // onChange={(e) => setValues({ ...values, subjects_ids: e })}
              mode='tags'
              size='large'
              style={{
                width: '400px',
              }}
              placeholder='Tags Mode'
              options={subjects.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </div>

          <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
            <label className='form__category-lable'>status</label>
            <Select
              size='large'
              defaultValue={values.status}
              style={{inlineSize: 400}}
              onSelect={(e: any) => setValues({...values, status: e})}
              options={[
                {value: 'ACTIVE', label: 'ACTIVE'},
                {value: 'INACTIVE', label: 'INACTIVE'},
              ]}
            />
          </div>
        </div>


      </div>
    </>
  )
}
export default EditStudent
