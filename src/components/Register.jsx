import React, { useRef,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {userContext} from '../App'

const Register = () => {

    const email = useRef();
    const name = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const userCntxt = useContext(userContext);

    const handleRegister = (e) => {
        e.preventDefault();

        fetch('/api/users/register', {
            method: 'POST',
            body: JSON.stringify({
                password: password.current.value,
                email: email.current.value,
                name: name.current.value
            }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        }).then(res => res.json()).then(data => {
            console.log(data);
            if (data.result){
                alert('Email verification link is sent to your email address. Verify and login');
                navigate('/login')
                // localStorage.setItem("user", JSON.stringify(data.user))
                // console.log(userCntxt)
                // userCntxt.userDispatch(data.user)
                // navigate('/blogs');
            }else{
                alert("Failed to Register")
            }
        })
    }

    return (
        <>
            <div className="conatiner row d-flex justify-content-center m-0">
                <div className="card col-lg-4 col-10">
                    <div className="card-body">
                        <form>
                            <h4><i className="fas fa-user"/> User</h4>
                            <hr />
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" ref={name} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email" ref={email} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label" >Password</label>
                                <input type="password" className="form-control" id="password" ref={password} />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={handleRegister}>Register <i className="fas fa-user-plus" /></button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register