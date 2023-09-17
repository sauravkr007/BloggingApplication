import React, { useRef,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {userContext} from '../../App'

const Register = () => {

    const email = useRef();
    const password = useRef();
    const grant_token = useRef();
    const navigate = useNavigate();
    const userCntxt = useContext(userContext);

    const handleRegister = (e) => {
        e.preventDefault();

        fetch('/api/admin/admin-mantra-register', {
            method: 'POST',
            body: JSON.stringify({
                password: password.current.value,
                email: email.current.value,
                grant_token: grant_token.current.value
            }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        }).then(res => res.json()).then(data => {
            console.log(data);
            if (data.result){
                localStorage.setItem('user',JSON.stringify(data.user))
                userCntxt.userDispatch(data.user)
                navigate('/blogs');
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
                            <h4><i className="fas fa-user-cog" /> Admin</h4>
                            <hr />
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email" ref={email} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label" >Password</label>
                                <input type="password" className="form-control" id="password" ref={password} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="grant_token" className="form-label" >Grant token</label>
                                <input type="password" className="form-control" id="grant_token" ref={grant_token} />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={handleRegister}>Access <i className="fas fa-user-plus"/></button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register