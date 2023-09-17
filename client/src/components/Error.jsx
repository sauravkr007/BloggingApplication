import React from 'react'
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();

  return (
    <div style={{ fontSize: '4.5vw',
        marginTop: '25vh',
        textAlign: 'center',
        color: 'green'
    }}>
        Seems Empty ? Return <i className="fas fa-home" style={{ cursor: 'pointer', color: 'blue' }} onClick={e=>navigate('/')}></i>
    </div>
  )
}

export default Error