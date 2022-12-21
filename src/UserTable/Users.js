import React from "react";
import {Button, Modal,} from 'react-bootstrap'
import axios from "axios";
import { useState , useEffect} from "react";
const User = () =>{
    const [Data, setData] = useState([]);
    const [RowData, SetRowData] = useState([]);
    const [ViewShow, SetViewShow] = useState(false);
    const handleViewShow = () => { SetViewShow(true) };
    const hanldeViewClose = () => { SetViewShow(false) };

    const [ViewEdit, SetEditShow] = useState(false);
    const handleEditShow = () => { SetEditShow(true) };
    const hanldeEditClose = () => { SetEditShow(false) };

    const [ViewDelete, SetDeleteShow] = useState(false);
    const handleDeleteShow = () => { SetDeleteShow(true) };
    const hanldeDeleteClose = () => { SetDeleteShow(false) };

    const [ViewPost, SetPostShow] = useState(false);
    const handlePostShow = () => { SetPostShow(true) };
    const hanldePostClose = () => { SetPostShow(false) };

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [sex, setSex] = useState("");
    const [age, SetAge] = useState(0);

    const [Delete,setDelete] = useState(false);

    const [id,setId] = useState("");

    const getUserData = () =>{
        const url = 'http://localhost:3001/users'
        axios.get(url)
            .then(response => {
                const result = response.data;
                const { status, message, data } = result;
                if (status === 'SUCCESS') {
                    alert(message, status)
                }
                else {
                    setData(data)
                    console.log(data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    };
    const handleSubmite = () => {
        const url = 'http://localhost:3001/users' 
        const Credentials = { firstName, lastName, email, sex, age }
        axios.post(url, Credentials)
            .then(response => {
                const result = response.data;
                const { status, message, data } = result;
                if (status === 'SUCCESS') {
                    alert(message, status)
                }
                else {
                    alert(message)
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
    };
    const handleEdit = () =>{
        const url = `http://localhost:3001/users/${id}`
        const Credentials = { firstName, lastName, email, sex, age  }
        axios.put(url, Credentials)
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                if (status !== 'SUCCESS') {
                    alert(message, status)
                }
                else {
                    alert(message)
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
    };
    const handleDelete = () =>{
        const url = `http://localhost:3001/users/${id}`
        axios.delete(url)
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                if (status === 'SUCCESS') {
                    alert(message, status)
                }
                else {
                    alert(message)
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
    };
    console.log(ViewShow, RowData);
    useEffect(() => {
        getUserData();
    }, [])
    

    return(
        <div>
            <div className="row">
                <div className="mt-5 mb-4">
                    <Button variant='primary' onClick={() => { handlePostShow() }}><i className='fa fa-plu'></i>
                        Add New user
                    </Button>
                </div>
            </div>
            <div className='row'>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>lastname</th>
                                <th>email</th>
                                <th>sex</th>
                                <th>age</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Data.map((user) =>
                                <tr key={user._id}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.sex}</td>
                                    <td>{user.age}</td>
                                    <td style={{ minWidth: 190 }}>
                                        <Button size='sm' variant='primary' onClick={() => { handleViewShow(SetRowData(user)) }}>View</Button>|
                                        <Button size='sm' variant='warning' onClick={()=> {handleEditShow(SetRowData(user),setId(user._id))}}>Edit</Button>|
                                        <Button size='sm' variant='danger' onClick={() => {handleViewShow(SetRowData(user),setId(user._id), setDelete(true))}}>Delete</Button>|
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='model-box-view'>
                <Modal
                    show={ViewShow}
                    onHide={hanldeViewClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>View users Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={RowData.firstName} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.lastName} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="email" className='form-control' value={RowData.email} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.sex} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="age" className='form-control' value={RowData.age} readOnly />
                            </div>
                            {
                                Delete && (
                                    <Button type='submit' className='btn btn-danger mt-4' onClick={handleDelete}>Delete user</Button>
                                )
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeViewClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className='model-box-view'>
                <Modal
                    show={ViewPost}
                    onHide={hanldePostClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add new user</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' onChange={(e) => setFirstName(e.target.value)} placeholder="Please enter Name" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setLastName(e.target.value)} placeholder="Please enter lastname" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="email" className='form-control' onChange={(e) => setEmail(e.target.value)} placeholder="Please enter email" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setSex(e.target.value)} placeholder="Please enter sex" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="number" className='form-control' onChange={(e) => SetAge(e.target.value)} placeholder="Please enter age" />
                            </div>
                            <Button type='submit' className='btn btn-success mt-4' onClick={handleSubmite}>Add user</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldePostClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className='model-box-view'>
                <Modal
                    show={ViewEdit}
                    onHide={hanldeEditClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit user</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>Name</label>
                                <input type="text" className='form-control' onChange={(e) => setFirstName(e.target.value)} placeholder="Please enter Name" defaultValue={RowData.firstName}/>
                            </div>
                            <div className='form-group mt-3'>
                                <label>lastname</label>
                                <input type="text" className='form-control' onChange={(e) => setLastName(e.target.value)} placeholder="Please enter lastname" defaultValue={RowData.lastName} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>email</label>
                                <input type="email" className='form-control' onChange={(e) => setEmail(e.target.value)} placeholder="Please enter email" defaultValue={RowData.email}/>
                            </div>
                            <div className='form-group mt-3'>
                                <label>sex</label>
                                <input type="text" className='form-control' onChange={(e) => SetAge(e.target.value)} placeholder="Please enter sex" defaultValue={RowData.sex}/>
                            </div>
                            <div className='form-group mt-3'>
                                <label>Address</label>
                                <input type="number" className='form-control' onChange={(e) => SetAge(e.target.value)} placeholder="Please enter age" defaultValue={RowData.age}/>
                            </div>
                            <Button type='submit' className='btn btn-warning mt-4' onClick={handleEdit}>Edit user</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeEditClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}
export default User;