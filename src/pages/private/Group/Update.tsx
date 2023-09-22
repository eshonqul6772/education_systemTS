import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {BiErrorAlt} from 'react-icons/bi';
import {AiOutlineSave} from 'react-icons/ai';
import {Select} from 'antd';

import {IIdAndName} from 'helpers/interface';

import GetGroup from 'services/group.service';
import getSubject from 'services/subject.service';

import Button from 'components/Button';
import Input from 'components/Input';


const Update = () => {

  const navigate = useNavigate()
  const {id} = useParams();

  const [subject, setSubject] = useState<IIdAndName[]>([]);
  const [values, setValues] = useState<IIdAndName>({
    name: '',
    subject_id: 0,
    status: 'ACTIVE',
  });

  useEffect(() => {
    GetGroup.getGroup(id)
      .then((res) => {
        const {name, subject, status} = res.data;
        setValues({
          name,
          subject_id: subject.id,
          status,
        });
      })
      .catch(err => console.log(err));
  }, [id]);


  const handleSubmit = async (evt: any) => {
    evt.preventDefault();

    GetGroup.update(id, values)
      .then(res => {
        navigate('/group');
      })
      .catch(err => {
        console.log(err);
      });
  };

  console.log(values)

  useEffect(() => {
    getSubject.getAll().then((response) => {
      setSubject(response.data);
    });
  }, []);


  return (
    <>

      <div className='operation__top'>
        <Button
          onClick={() => navigate('/group')}
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

      <div className="table__box">

        <div>
          <Input
            label='subject_name'
                 onChange={e =>
                   setValues({...values, name: e})
                 }
                 type='text'
                 placeholder='group name'
                 value={values.name}
          />
        </div>

        <div style={{display:'flex', justifyContent:'space-between', flexDirection:'column'}}>
          <label>
            subject
          </label>
          <Select
            defaultValue={values.subject_id}
            onSelect={(e) => setValues({...values, subject_id: e})}
            style={{
              width: '400px',
            }}
            options={subject.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
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
  );
};

export default Update;
