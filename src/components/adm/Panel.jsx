import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import '../../app.css'

const getDate = (dt) => {
    let d = moment(dt).format('YYYY-MM-DD HH:mm:ss');
    return d;
}

const Panel = () => {

    const [udata, setudata] = useState([]);
    const [loading, setloading] = useState(true);
    const navigate = useNavigate();

    const handleUdelete = e => {
        e.preventDefault();
        e.stopPropagation();

        fetch('/api/users/' + e.target.parentElement.id, {
            method: 'DELETE'
        }).then(res => res.json()).then(data => {
            console.log(data);

            if (data.result) {
                let child = document.querySelector(`#--${e.target.parentElement.id}`)
                let par = child.parentElement;
                par.removeChild(child)
            } else {
                alert("Failed to Remove!")
            }
        })

    }

    useEffect(() => {
        fetch('/api/users').then(res => res.json()).then(data => {

            if (!data.result && data.result === false) {
                navigate('/login');
            }

            setloading(false);
            setudata(data);
            console.log(data);
        })
    }, [])


    if (loading)
        return (
            <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        )

    return (
        <div className="container-fluid">
            <div className="card" style={{ margin: 'auto', width: '90vw', overflow: 'scroll' }} id="panel-card">
                <div className="card-body">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                {/* <th scope="col">Verified</th> */}
                                <th scope="col">Created@</th>
                                <th scope="col">Updated@</th>
                                <th scope="col">Role</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>


                        <tbody>

                            {
                                udata.map((e, i) => {
                                    return (
                                        <>
                                            <tr id={"--" + e._id}>
                                                <td>{e.name}</td>
                                                <td>{e.email}</td>
                                                {/* {
                                                    e.verified ? <td style={{ color: 'green' }}>verified</td> :
                                                        <td style={{ color: 'red' }}>unverified</td>
                                                } */}

                                                <td>{getDate(e.createdAt)}</td>
                                                <td>{getDate(e.updatedAt)}</td>
                                                {e.isAdmin ?
                                                    <>
                                                        <td style={{ color: 'red' }}>admin</td>
                                                        <td><i className="fas fa-ban" /></td>
                                                    </>
                                                    :
                                                    <>
                                                        <td style={{ color: 'blue' }}>user</td>
                                                        <td>
                                                            <a href="" id={e._id} onClick={handleUdelete}
                                                                style={{ color: 'red' }}
                                                            >
                                                                <i className="fas fa-trash fa-lg" />
                                                            </a>
                                                        </td>
                                                    </>
                                                }


                                            </tr>
                                        </>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Panel