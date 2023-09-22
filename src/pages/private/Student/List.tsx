import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {MdDelete, MdModeEdit} from  'react-icons/md';
import {AiOutlineSearch} from 'react-icons/ai';
import {IoIosAddCircleOutline} from 'react-icons/io';
import {Modal, Pagination, Table} from 'antd';

import getStudentsService from 'services/student.service';

import {IPerson} from 'helpers/interface';

import Loader from 'components/Loader';
import Button from 'components/Button';

import '../Subject/Subject.scss';

const Student: React.FC = () => {
    const navigate = useNavigate();

    const [data, setStudent] = useState<IPerson[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [selected, setSelected] = useState(null);
    const [loader, setLoader] = useState(true);

    const handelDelete = (id: any) => {
        getStudentsService
            .remove(id)
            .then(() => {
                getList()
                setSelected(null);
                setStudent([]);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const getList = (name?: string) => {
        setLoader(true)
        getStudentsService.getAll(name, {
            page: currentPage,
            per_page: 3,
            sort: {
                name: 'id',
                direction: 'desc',
            },
        }).then((res) => {
            setTotalCount(res?.data.totalCount);
            setStudent(res?.data.data || []);
        }).catch((err) => {
            console.log(err);
        });
        setLoader(false)
    };

    useEffect(() => {
       setTimeout(()=>{
           getList()
       },1000)
    }, [currentPage]);

    return (
        <>
            <div className='search__box'>

                <div className='search__input-box'>

                    <input
                      className='search__input'
                      placeholder="search..."
                      id='search'
                      onChange={e =>
                        getList(e.target.value)}
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
                  onClick={() => navigate('/student/create')}
                />
            </div>

            <div className="table__box">
                {loader ? (
                    <Loader/>
                ) : (
                    <Table
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
                                title: 'phone_number',
                                dataIndex: 'phone',
                            },
                            {
                                title: 'status',
                                dataIndex: 'status',
                                render: (item) => <span
                                    className={item == 'ACTIVE' ? 'status' : 'status inactive'}>{item}</span>
                            },
                            {
                                title: (
                                    <span className='action'>Action</span>
                                ),
                                render: (item) => {
                                    return (
                                        <div className='action__btn'>
                                            <button
                                                onClick={() => navigate(`/student/${item.id}`)}
                                                className="edit__btn"
                                            >
                                                <MdModeEdit/>
                                            </button>
                                            <Button
                                                onClick={() => setSelected(item.id)}
                                                variant="danger"
                                                prefixIcon={<MdDelete size="25px"/>}
                                                className="delet__btn"
                                            />
                                        </div>
                                    );
                                },
                            },
                        ]}
                        dataSource={data}
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
                    title="You want to delete this user"
                    open={!!selected}
                    onCancel={() => setSelected(null)}
                    footer={null}
                >
                    <div className="d-flex justify-content-end gap-4 mt-4">
                        <Button
                            title="cancel"
                            variant="neutral"
                            onClick={() => setSelected(null)}
                        />
                        <Button
                            title="delete"
                            variant="danger-delete"
                            onClick={() => handelDelete(selected)}
                        />
                    </div>
                </Modal>

            </div>
        </>
    );
}

export default Student;
