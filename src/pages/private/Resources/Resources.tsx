import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination, Table, Modal } from 'antd';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { MdModeEdit, MdDelete } from 'react-icons/md';


import getUploadFile from 'services/resources.service';

import Button from 'components/Button';

interface IResources {
  name: string;
  hashId: string
}

const Resources: React.FC = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState<IResources[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [selected, setSelected] = useState(null)

  const handleDelete = (id:any) => {
    getUploadFile.remove(id)
      .then(() => {
        getList()
        setSelected(null)
      })
      .catch(errors => {
        console.log(errors.data)
      })
  }

 const getList =(name?: string) => {
    getUploadFile
      .getFile(name, {
        per_page: 5,
        page: currentPage,
        sort: {
          name: 'id',
          direction: 'desc',
        },
      })
      .then((res) => {
        setTotalCount(res.data.totalCount);
        setItems(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }

    useEffect(() => {
      getList()
    },[currentPage])

  return (
    <>
      <div className='d-flex justify-content-end table__box'>

        <Button
          prefixIcon={<IoIosAddCircleOutline size='25px' />}
          title='create'
          variant='primary'
          onClick={() => navigate('/resources/upload')} />
      </div>

      <div className='table__box'>
        <Table
          rowKey='id'
          columns={[
            {
              title: 'name',
              dataIndex: 'name',
            },
            {
              title: 'contentType',
              dataIndex: 'contentType',
            },
            {
              title: 'action',
              render: (item) => {
                return (
                  <div className='action__btn'>
                    <Button
                      variant='danger'
                      onClick={() => setSelected(item.id)}
                      prefixIcon={<MdDelete size='25px' />}
                      className='delet__btn'
                    />
                  </div>
                )
              },
            }
          ]}

          // onRow={(record , rowKey) => {
          //   return {
          //     onClick: event => {
          //       navigate(`/resources/${record.hashId}`)
          //     }
          //   }
          // }}
          dataSource={items}
          pagination={false}
          bordered
        />


        <Pagination
          pageSize={5}
          className='my-3 d-flex justify-content-end'
          current={currentPage + 1}
          total={totalCount}
          onChange={(page) => setCurrentPage(page - 1)}
        />

        <Modal
          title='You want to delete this user'
          open={!!selected}
          onCancel={() => setSelected(null)}
          footer={null}
        >
          <div style={{ gap: '10px' }} className='operation__top'>
            <Button title='cancel' variant='neutral' onClick={() => setSelected(null)} />
            <Button title='delete' variant='danger-delete' onClick={() => handleDelete(selected)} />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Resources;
