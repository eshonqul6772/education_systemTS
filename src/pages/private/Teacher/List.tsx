import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoIosAddCircleOutline } from 'react-icons/io'
import { Modal, Table, Pagination } from 'antd';

import { IIdAndName, IPerson } from 'helpers/interface';

import getTeamService from 'services/teacher.service';

import Button from 'components/Button';
import Loader from 'components/Loader';

import '../Subject/Subject.scss';


const Teacher: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<IPerson[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [selected, setSelected] = useState(null);
    const [loader, setLoader] = useState(true)

    const handleDelete = (id: any) => {
        getTeamService.remove(id)
            .then(() => {
                setSelected(null);
                getList();
            })
            .catch(err => {
                console.log(err);
            });
    };

    const getList = (name?: string) => {
        setLoader(true);

        getTeamService.getAll(name, {
            page: currentPage,
            per_page: 3,
            sort: {
                name: 'id',
                direction: 'desc',
            },
        }).then(res => {
            setTotalCount(res.data.totalCount);
            setData(res.data.data);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoader(false);
        });
    };

    useEffect(() => {
        setTimeout(() => {
            getList()
        }, 1000)
    }, [currentPage]);

    return (
        <>
            <div className='search__box'>

                <div className='search__input-box'>
                    <input
                        className='search__input'
                        placeholder='search...'
                        id='search'
                        onChange={e =>
                        getList(e.target.value)}
                    />
                    <Button
                        className='search__icon'
                        prefixIcon={<AiOutlineSearch
                         size='20px' color='white' />}
                        variant='primary'
                    />

                </div>

                <Button
                    prefixIcon={<IoIosAddCircleOutline size='25px' />}
                    title='create'
                    variant='primary'
                    onClick={() => navigate('/teacher/create')}
                />
            </div>

            <div className='table__box'>
                {loader
                    ? <Loader />
                    : <Table
                        rowKey='id'
                        columns={[
                            {
                                title: 'first_name',
                                dataIndex: 'firstName',
                            },
                            {
                                title: 'last_name',
                                dataIndex: 'lastName',
                            },
                            {
                                title: 'subject',
                                dataIndex: 'subjects',
                                render: (items: IIdAndName[]) => items.map(item => (
                                    <p style={{fontSize:'10px', margin:'0'}} key={item.id}>{item.name};</p>
                                ))
                            },
                            {
                                title: 'status',
                                dataIndex: 'status',
                                render: (item) => {
                                    return <span className={item == 'ACTIVE' ? 'status' : 'status inactive'}>{item}</span>
                                },
                            },

                            {
                                title: (
                                    <span className='action'>Action</span>
                                ),
                                render: (item) => {
                                    return (
                                        <div className='action__btn'>
                                            <button
                                                onClick={() => navigate(`/teacher/${item.id}`)}
                                                className='edit__btn'
                                            >
                                                <MdModeEdit />
                                            </button>
                                            <Button
                                                onClick={() => setSelected(item.id)}
                                                variant='danger'
                                                prefixIcon={<MdDelete size='25px' />}
                                                className='delet__btn'
                                            />
                                        </div>
                                    );
                                },
                            },
                        ]}
                        dataSource={data}
                        pagination={false}
                    />
                }

                <Pagination
                    className='table__pagination'
                    pageSize={2}
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
                    <div className='action'>
                        <Button
                            title='cancel'
                            variant='neutral'
                            onClick={() => setSelected(null)}
                        />

                        <Button
                            title='delete'
                            variant='danger-delete'
                            onClick={() => handleDelete(selected)}
                        />
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default Teacher;
