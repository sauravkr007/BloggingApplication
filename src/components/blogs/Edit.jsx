import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';

let fetchData;

const Edit = () => {

  const head = useRef();
  const body = useRef();
  const navigate = useNavigate();
  const [isloading, setisLoading] = useState(true);

  const handleEdit = (e) => {
    e.preventDefault();
    fetch('/api/blogs/' + window.location.pathname.split('/')[2], {
      method: 'PUT',
      body: JSON.stringify({
        body: body.current.value,
        head: head.current.value
      }),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include'
    }).then(res => res.json()).then(data => {
      console.log(data);
      if (data.result)
        navigate('/blogs/' + window.location.pathname.split('/')[2]);
      else
        alert("Failed to Edit! Why? You're not authorized or Server error")
    });
  }

  useEffect(() => {

    // fetch blogs from the server
    // change the proxy
    fetch('/api/blogs/' + window.location.pathname.split('/')[2]).then(res => res.json()).then(data => {
      fetchData = data;
      console.log(fetchData);
      setisLoading(false);
    });

  }, [])

  if (isloading)
    return <div className="d-flex justify-content-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>

  return (
    <>
      <div className="conatiner row d-flex justify-content-center m-0">
        <div className="card" style={{ width: '90vw' }}>
          <div className="card-body">
            <form>
              <h5><i className="fas fa-heading" /></h5>
              <div className="mb-3">
                <input type="text" className="form-control" id="head" placeholder="title" ref={head} defaultValue={fetchData.head} />
              </div>

              <h5><i className="far fa-keyboard"></i></h5>
              <div className="mb-3">
                <textarea className="form-control" rows='12' id="body" name='body' ref={body} placeholder="share your ideas..." defaultValue={fetchData.body} />
              </div>

              <button type="submit" className="btn btn-primary" onClick={handleEdit}><i className="far fa-save"></i> Save</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Edit