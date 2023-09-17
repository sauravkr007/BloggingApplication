import React, { useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../App'
// import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const Login = () => {
    const userCntxt = useContext(userContext);
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email.current.value,
                password: password.current.value
            }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        }).then(res => res.json()).then(data => {
            console.log(data);
            if (data.result) {
                localStorage.setItem("user", JSON.stringify(data.user))
                userCntxt.userDispatch(data.user)
                navigate('/blogs');
            }else{
                alert("Failed to Login")
            }
        })
    }

    const handeGlogin = response => {
        let data = {
            email: response.Du.tv,
            name: response.Du.tf,
            password: response.googleId
        }
        console.log(data)
        fetch('/api/users/ologin', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        }).then(res => res.json()).then(data => {
            console.log('ad');

            if (data.result) {
                console.log(data);
                localStorage.setItem("user", JSON.stringify(data.user))
                userCntxt.userDispatch(data.user)
                navigate('/blogs');
            }else{
                alert("Failed to Login")
            }
        })
    }

    const handeFlogin = response => {
        let data = {
            email: response.email,
            name: response.name,
            password: response.id
        }
        console.log(data)
        fetch('/api/users/ologin', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        }).then(res => res.json()).then(data => {
            console.log('ad');

            if (data.result) {
                console.log(data);
                localStorage.setItem("user", JSON.stringify(data.user))
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
                            <h4><i className="fas fa-user" /> User</h4>
                            <hr />
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email" ref={email} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" ref={password} />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={handleLogin}>Login <i className="fas fa-sign-in-alt" /></button>
                        </form>
                        <br />
                        
                        <div className="d-flex justify-content-between p-0 m-0">
                        {/* <GoogleLogin
                            clientId={process.env.REACT_APP_GAPI}
                            onSuccess={handeGlogin}
                            buttonText = "Google"
                            onFailure={res => console.log(res)}
                        /> */}
                        <FacebookLogin
                            appId={process.env.REACT_APP_FAPI}
                            fields="name,email,picture"
                            callback={res=>handeFlogin(res)}
                            size="small"
                            textButton="facebook"
                            cssClass = 'my-facebook-icon' 
                        />
                        </div>
 
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login