import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {MdDelete, MdModeEdit} from 'react-icons/md'
import {AiOutlineSearch} from 'react-icons/ai'
import {IoIosAddCircleOutline} from 'react-icons/io'
import {Modal, Table, Pagination, message} from 'antd'

import subjectService from 'services/subject.service'

import {IIdAndName} from 'helpers/interface'

import Loader from 'components/Loader'
import PageHeader from 'components/PageHeader';
import Button from 'components/Button'

import './Subject.scss'

const Subject: React.FC = () => {
    const navigate = useNavigate()

    const [messageApi, contextHolder] = message.useMessage()

    const [currentPage, setCurrentPage] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [selected, setSelected] = useState(null)
    const [items, setItems] = useState<IIdAndName[]>([])
    const [loading, setLoading] = useState(true)


    const handelDelete = (id: any) => {
        subjectService
            .remove(id)
            .then(res => {
                getList()
                setSelected(null)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getList = (name?: any) => {
        setLoading(true)
        subjectService
            .getData(name, {
                page: currentPage,
                per_page: 3,
                sort: {
                    name: 'id',
                    direction: 'desc',
                },
            })
            .then(res => {
                setTotalCount(res.data.totalCount)
                setItems(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
        setLoading(false)
    }

    useEffect(() => {
        setTimeout(() => {
            getList()
        }, 1000)
    }, [currentPage])

    return (
        <>
            {contextHolder}

            <PageHeader
                title='title_contacts'
                breadcrumb={{
                    routes: [
                        {
                            to: '/',
                            icon: 'Home',
                        },
                        {
                            name: 'title_contacts',
                        },
                    ],
                }}
            />

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
                        prefixIcon={<AiOutlineSearch size='20px' color='white'/>}
                        variant='primary'
                    />
                </div>

                <Button
                    prefixIcon={<IoIosAddCircleOutline size='25px'/>}
                    title='create'
                    variant='primary'
                    onClick={() => navigate('/subject/create')}
                />
            </div>

            <div className='table__box'>
                {loading ? (
                    <Loader/>
                ) : (
                    <Table
                        rowKey='id'
                        columns={[
                            {
                                title: 'Name',
                                dataIndex: 'name',
                            },

                            {
                                title: 'status',
                                dataIndex: 'status',
                                render: (item) => {
                                    return <span
                                        className={item == 'ACTIVE' ? 'status' : 'status inactive'}>{item}</span>
                                },
                            },
                            {
                                title: <span className='action'>Action</span>,
                                render: (item) => {
                                    return (
                                        <div className='action__btn'>
                                            <button onClick={() => navigate(`/subject/${item.id}`)}
                                                    className='edit__btn'>
                                                <MdModeEdit/>
                                            </button>
                                            <Button
                                                onClick={() => setSelected(item.id)}
                                                variant='danger'
                                                prefixIcon={<MdDelete size='25px'/>}
                                                className='delet__btn'
                                            />
                                        </div>
                                    )
                                },
                            },
                        ]}
                        dataSource={items}
                        pagination={false}
                    />
                )}

                <Pagination
                    className='table__pagination'
                    pageSize={3}
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
                    <div style={{gap: '10px'}} className='action'>
                        <Button title='cancel' variant='neutral' onClick={() => setSelected(null)}/>
                        <Button title='delete' variant='danger-delete' onClick={() => handelDelete(selected)}/>
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default Subject
