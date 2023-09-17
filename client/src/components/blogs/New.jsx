import React, {  useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const New = () => {
    const head = useRef();
    const body = useRef();
    const navigate = useNavigate();


    const handleCreate = (e) => {
        e.preventDefault();
        fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({
                head: head.current.value,
                body: body.current.value
            }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        }).then(res => res.json()).then(data => {
            console.log(data);
            if (data.result)
                navigate('/blogs');
            else
                alert("Failed to Create! Why? You must login first or Server error")
        })
    }

    return (
        <>
            <div className="conatiner row d-flex justify-content-center m-0">
                <div className="card" style={{ width: '90vw' }}>
                    <div className="card-body">
                        <form>
                            <h5><i className="fas fa-heading" /></h5>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="head" placeholder="title" ref={head} />
                            </div>
                            <h5><i className="far fa-keyboard"></i></h5>
                            <div className="mb-3">
                                <textarea className="form-control" rows="12" id="body" name='body' placeholder="share your ideas..." ref={body} />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={handleCreate}><i className="far fa-save"></i> Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default New