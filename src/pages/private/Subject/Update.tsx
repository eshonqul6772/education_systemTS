import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {BiErrorAlt} from 'react-icons/bi';
import {AiOutlineSave} from 'react-icons/ai';
import toast, {Toaster} from 'react-hot-toast';
import {Select} from 'antd';

import ServicesSubject from 'services/subject.service';

import {IIdAndName} from 'helpers/interface';

import Button from 'components/Button';
import Input from 'components/Input';

import './Subject.scss'


const Update = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState<IIdAndName>({
    name: '',
    status: 'ACTIVE',
  });

  useEffect(() => {
    ServicesSubject.getSubject(id)
      .then(res => {
        const {name, status} = res.data;
        setValues({name, status});
      })
      .catch(err => console.log(err));
  }, [id]);

  console.log(values)


  const handleSubmit = async (evt: any) => {
    evt.preventDefault();
    ServicesSubject.update(id, values)
      .then(res => {
        toast.success('success update data')
        navigate('/subject')
      }).catch(err => {
      console.log(err);
    });
  }


  return (
    <>

      <div className='operation__top'>
        <Button
          onClick={() => navigate('/subject')}
          prefixIcon={<BiErrorAlt size='25px'/>}
          title='cencle'
          variant='neutral'
        />

        <Button
          onClick={handleSubmit}
          type='button'
          prefixIcon={<AiOutlineSave size='25px'/>}
          title='save'
          variant='success'
        />
      </div>

      <div className="table__box">

        <Toaster
          position="top-center"
          reverseOrder={true}
        />

        <div className="d-flex flex-column mb-3">

          <Input className='add__input'
                 label='subject_name'
                 onChange={(e) => setValues({...values, name: e})}
                 type="text"
                 placeholder="subject name"
                 value={values.name}
          />

          <Select
            defaultValue={values.status}
            style={{inlineSize: '400px'}}
            onSelect={(e: any) => setValues({...values, status: e})}
            options={[
              {value: 'ACTIVE', label: 'ACTIVE'},
              {value: 'INACTIVE', label: 'INACTIVE'},
            ]}
          />

        </div>

      </div>

    </>
  )
}

export default Update;
