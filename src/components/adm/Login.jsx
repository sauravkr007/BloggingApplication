import React, { useRef,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {userContext} from '../../App'

const Login = () => {

    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const userCntxt = useContext(userContext);

    const handleLogin = (e) => {
        e.preventDefault();
        fetch('/api/admin/admin-mantra-login', {
            method: 'POST',
            body: JSON.stringify({
                email: email.current.value,
                password: password.current.value
            }),
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()).then(data => {
            console.log(data);
            if (data.result){
                localStorage.setItem('user',JSON.stringify(data.user))
                userCntxt.userDispatch(data.user)
                navigate('/blogs');
            }else{
                alert("Failed to Login")
            }
        })
    }

    return (
        <>
            <div className="conatiner row d-flex justify-content-center m-0">
                <div className="card col-lg-4 col-10">
                    <div className="card-body">
                        <form>
                            <h4><i className="fas fa-user-cog"/> Admin</h4>
                            <hr />
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email"  ref={email} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password"  ref={password} />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={handleLogin}>login <i className="fas fa-sign-in-alt"></i></button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login