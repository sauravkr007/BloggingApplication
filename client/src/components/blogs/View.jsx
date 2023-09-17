import React, { useEffect, useState, useContext } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../App'
import moment from 'moment'
import sanitizeHtml from 'sanitize-html'
import {sanitizeOptions} from '../utils/sanitizeOptions'

let fetchData;
let user;



const getDate = (dt) => {
  let d = moment(dt).format('dddd, DD MMMM YYYY [at] HH:mm:ss');
  return d;
}

const Edit = () => {

  const [isloading, setisLoading] = useState(true);
  const navigate = useNavigate();
  const userCntxt = useContext(userContext);

  useEffect(() => {
    // fetch blogs from the server
    // change the proxy
    fetch("/api"+window.location.pathname).then(res => res.json()).then(data => {
      fetchData = data;
      console.log(fetchData.author);
      setisLoading(false);
    });

    if (localStorage.user) {
      user = userCntxt.userState
      console.log(user._id);
    }

  }, [userCntxt.userState])

  const handleDelete = (e) => {
    e.preventDefault();

    console.log('/api'+window.location.pathname)
    fetch('/api'+window.location.pathname, {
      method: 'DELETE'
    }).then(res => res.json()).then(data => {
      if (data.result)
        navigate('/blogs');
      else
        alert("Failed to Delete! Why? You're not authorized or Server error")
    })
  }

  const handleLike = e => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.target.parentElement.href);

    fetch(e.target.parentElement.href, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    }).then(res => res.json()).then(data => {
      console.log(data)
      if (data.result) {
        e.target.classList.toggle('liked');
      }else{
        alert("Failed to Like! Why? You must login first or Server error")
      }
    })
  }


  if (isloading)
    return <div className="d-flex justify-content-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>

  return (
    <>
      <div className="container-fluid row d-flex justify-content-center">
        <div className="col-lg-8 card">
          <div className="card-body">
            <h5 className="card-title">{fetchData.head}</h5>
            <h6 className="card-subtitle mb-2 text-muted"><i className="far fa-calendar-alt"></i> {getDate(fetchData.updatedAt)}</h6>
            <p className="card-text" dangerouslySetInnerHTML={{__html: sanitizeHtml(fetchData.body,sanitizeOptions)}}/>


            <h6 className="card-subtitle mb-2 text-muted"><i className="fas fa-feather-alt"/> {fetchData.authorName}</h6>

            {
              user && user._id ? <a href={'/api/blogs/' + fetchData._id + '/like'} onClick={handleLike} className="card-link"><i className="fas fa-heart fa-lg"></i></a>
                : ''
            }
            {user && (user._id === fetchData.author || user.isAdmin) ?
              <>
                <Link to="edit" className="card-link"><i className="far fa-edit fa-lg" style={{color: 'gray' }}></i></Link>
                <a className="card-link" onClick={handleDelete} href=""><i className="fas fa-trash fa-lg" style={{color: 'red' }}></i></a>
              </> : ''
            }

          </div>
        </div>
      </div>
    </>
  )
}

export default Edit