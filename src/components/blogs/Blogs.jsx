import React, { useEffect, useState,useContext } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom'
import moment from 'moment'
import './blog.css'
import {userContext} from '../../App'
import sanitizeHtml from 'sanitize-html'
import {sanitizeOptions} from '../utils/sanitizeOptions'

let user

const getDate = (dt) => {
  let d = moment(dt).format('DD MMMM YYYY');
  return d;
}

const Blogs = () => {
  const [fetchData, setfetchData] = useState([]);
  const [isloading, setisLoading] = useState(true);
  const userCntxt = useContext(userContext); 

  useEffect(() => {

    // fetch blogs from the server
    // change the proxy
    fetch("/api"+window.location.pathname+window.location.search).then(res => res.json()).then(data => {

      if(data && data.result)
        setfetchData(data.data)
      
      
      console.log(fetchData);
      setisLoading(false);
    });

    if (localStorage.user)
      user = userCntxt.userState
  }, [userCntxt.userState, userCntxt.searchState])

  const handleLike = e => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.target.parentElement.href);

    fetch(e.target.parentElement.href, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(data => {
      console.log(data)
      if (data.result) {
        e.target.classList.toggle('liked');
      }else
        alert("Something went wrong!")
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
      <div className="container-fluid">
        <div className="row  d-flex">
          {
            fetchData.map(e => {
              return <div className="col-lg-4 my-2">
                <div className="card" style={{ minheight: '50vh' }}>
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="card-title">{e.head}</h5>
                    <h6 className="card-subtitle mb-2 text-muted"><i className="far fa-calendar-alt"></i> {getDate(e.updatedAt)}</h6>

                    <p className="card-text hide-overflow" style={{ height: '15ch', overflow: 'scroll' }} dangerouslySetInnerHTML={{__html: sanitizeHtml(e.body,sanitizeOptions)}}/>

                    <h6 className="card-subtitle mb-2 text-muted"><i className="fas fa-feather-alt"></i> {e.authorName}</h6>

                    <div className="container d-flex justify-content-between p-0">
                      {
                        user ?<a href={'/api/blogs/' + e._id + '/like'} className="card-link" onClick={handleLike}
                          style={{textDecoration: 'none'}}
                        >
                        <span
                          style={{textDecoration: 'none', color: 'gray'}}
                        >{e.likes}</span> <i className="fas fa-heart fa-lg"></i></a> : ''
                      }
                      {
                        user && (user._id === e.author || user.isAdmin) ? <Link to={e._id + '/edit'} className="card-link"><i className="far fa-edit fa-lg" style={{color: 'gray' }}></i></Link> : ''
                      }
                      <Link to={e._id} className="card-link"><i className="fab fa-readme fa-lg" style={{color: 'green' }}></i></Link>
                    </div>

                  </div>
                </div>
              </div>
            })
          }
        </div>
      </div>
    </>
  )
}

export default Blogs