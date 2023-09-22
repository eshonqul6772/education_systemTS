import React, { useEffect, useState } from 'react'
import { Modal, Pagination, Table } from 'antd'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdDelete, MdModeEdit } from 'react-icons/md'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

import GetGroupServices from 'services/group.service'

import { IIdAndName } from 'helpers/interface'

import Button from 'components/Button'
import Loader from 'components/Loader'

import '../Subject/Subject.scss'

const Group: React.FC = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [items, setItems] = useState<IIdAndName[]>([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoader] = useState(true)

  const handelDelete = (id: any) => {
    GetGroupServices.remove(id)
      .then((res) => {
        getList()
        setSelected(null)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getList = (name?: string) => {
    setLoader(true)
    GetGroupServices.getAll(name, {
      page: currentPage,
      per_page: 3,
      sort: {
        name: 'id',
        direction: 'desc',
      },
    })
      .then((res) => {
        setTotalCount(res.data.totalCount)
        setItems(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoader(false)
      })
  }

  useEffect(() => {
      setTimeout(()=>{
        getList()
      },1000)
  }, [currentPage])

  return (
    <>
      <div className='search__box'>
        <div className='search__input-box'>
          <input
            className='search__input'
            placeholder='search...'
            id='search'
            onChange={(e) => getList(e.target.value)}
          />
          <Button
            className='search__icon'
            prefixIcon={<AiOutlineSearch size='20px' color='white' />}
            variant='primary'
          />
        </div>

        <Button
          prefixIcon={<IoIosAddCircleOutline size='25px' />}
          title='create'
          variant='primary'
          onClick={() => navigate('/group/create')}
        />
      </div>

      <div className='table__box'>
        {loading ? (
          <Loader />
        ) : (
          <Table
            rowKey='id'
            columns={[
              {
                title: 'groupName',
                dataIndex: 'name',
              },

              {
                title: 'subject',
                dataIndex: 'subject',
                render: (item) => {
                  return <div>{item.name}</div>
                },
              },

              {
                title: 'Status',
                dataIndex: 'status',
                render: (item) => {
                  return <span className={item == 'ACTIVE' ? 'status' : 'status inactive'}>{item}</span>
                },
              },
              {
                title: <span className='action'>Action</span>,
                render: (item) => {
                  return (
                    <div className='action__btn'>
                      <button onClick={() => navigate(`/group/${item.id}`)} className='edit__btn'>
                        <MdModeEdit />
                      </button>

                      <Button
                        variant='danger'
                        onClick={() => setSelected(item.id)}
                        prefixIcon={<MdDelete size='25px' />}
                        className='delet__btn'
                      />
                    </div>
                  )
                },
              },
            ]}
            dataSource={items}
            pagination={false}
            bordered
          />
        )}

        <Pagination
          pageSize={3}
          className='table__pagination'
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
          <div style={{gap:'10px'}} className='operation__top'>
            <Button title='cancel' variant='neutral' onClick={() => setSelected(null)} />
            <Button title='delete' variant='danger-delete' onClick={() => handelDelete(selected)} />
          </div>
        </Modal>
      </div>
    </>
  )
}

export default Group
