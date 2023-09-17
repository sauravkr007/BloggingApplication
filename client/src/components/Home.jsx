import React from 'react'
import {useNavigate} from 'react-router-dom'
import walpaper from './utils/walpaper.jpg'

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="" style={{ position: 'relative' , overflow: 'hidden'}}>
                <img src={walpaper} alt="..."
                    style={{
                        width: "100%",
                        height: "100vh",
                    }}
                />

                    <div id="heading">
                        <div id="heading1" onClick={e=>navigate('/blogs')}>Blogs.</div>
                        <div id="heading2" onClick={e=>navigate('/login')}>Login.</div>
                        <div id="heading3" onClick={e=>navigate('/register')}>Register.</div>
                    </div>
            
            </div>


        </>
    )
}

export default Home