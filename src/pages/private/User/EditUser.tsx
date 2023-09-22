import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';


import ServiceUser from 'services/user.service';


import Button from 'components/Button';


interface IUser  {
    firstName: string,
    lastName: string,
    phone: string,
    username: string,
    password: string,
    roleId: string,
    status: 'ACTIVE'
}


const EditSubject:React.FC = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        username: '',
        password: '',
        roleId: '',
        status: 'ACTIVE'
    });


    useEffect(() => {
        ServiceUser.getUserId(id)
            .then((res) => {
                console.log(res.data)
                const {firstName, lastName, phone, username, password, roleId, status} = res.data;
                setValues({firstName, lastName, phone, username, password, roleId, status});
            })
            .catch((err) => console.log(err));
    }, [id]);
    console.log(values)

    const handleSubmit = async (evt:any) => {
        evt.preventDefault();

        ServiceUser.update(id, values)
            .then((res) => {
                navigate('/user');
            }).catch((err) => {
            console.log(err);
        });
    }

    console.log(values)

    return (
        <div className="table__box">
            <form onSubmit={handleSubmit} className="w-100">


                <div className="d-flex justify-content-between w-100 mb-3">
                    <div className="w-25">
                        <label className="form__category-lable" htmlFor="">
                            firs_name
                        </label>

                        <input className="form-control"
                               onChange={(e) => setValues({...values, firstName: e.target.value})}
                               type="text"
                               placeholder="first_name"
                               defaultValue={values.firstName}
                        />
                    </div>

                    <div className="w-25">
                        <label className="form__category-lable" htmlFor="">
                            last_name
                        </label>

                        <input className="form-control"
                               onChange={(e) => setValues({...values, lastName: e.target.value})}
                               type="text"
                               placeholder="subject name"
                               defaultValue={values.lastName}
                        />
                    </div>


                    <div className="w-25">
                        <label className="form__category-lable" htmlFor="">
                            phone
                        </label>

                        <input className="form-control"
                               onChange={(e) => setValues({...values, phone: e.target.value})}
                               type="text"
                               placeholder="phone"
                               defaultValue={values.phone}
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-between w-100 mb-3">
                    <div className="w-25">
                        <label className="form__category-lable" htmlFor="">
                            username
                        </label>

                        <input className="form-control"
                               onChange={(e) => setValues({...values, username: e.target.value})}
                               type="text"
                               placeholder="username"
                               defaultValue={values.username}
                        />
                    </div>

                    <div className="w-25">
                        <label className="form__category-lable" htmlFor="">
                            password
                        </label>

                        <input className="form-control"
                               onChange={(e) => setValues({...values, password: e.target.value})}
                               type="text"
                               placeholder="password"
                               defaultValue={values.password}
                        />
                    </div>


                    <div className="w-25">
                        <label className="form__category-lable" htmlFor="">
                            role
                        </label>

                        <input className="form-control"
                               disabled
                               onChange={(e) => setValues({...values, username: e.target.value})}
                               type="text"
                               placeholder="usernmae"
                               defaultValue="admin"
                        />
                    </div>
                </div>

                <Button title="edit_user" variant="primary" type="submit"/>


            </form>
        </div>
    )
}

export default EditSubject;
