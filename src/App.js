import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useState } from 'react'
import NavB from './components/NavB';
import { Routes, Route, NavLink, Link, Navigate } from 'react-router-dom'
import './app.css';

import Blogs from './components/blogs/Blogs'
import Edit from './components/blogs/Edit'
import View from './components/blogs/View'
import New from './components/blogs/New'
import Register from './components/Register'
import Login from './components/Login'
import ALogin from './components/adm/Login'
import ARegister from './components/adm/Register'
import Panel from './components/adm/Panel'
import Home from './components/Home';
import Error from './components/Error';

export const userContext = createContext(); 


function App() {
  const [user,setuser] = useState(localStorage.length?JSON.parse(localStorage.user):null);  
  const [search,setsearch] = useState("");  

  return (
    <>
      <userContext.Provider value={{userState: user, userDispatch: setuser, searchState: search, searchDispatch: setsearch}}>
        <NavB />
        <Routes>
          <Route path="/blogs/:id/edit" element={user?<Edit />:<Navigate to='/login'/>} />3
          <Route path="/blogs/:id" element={<View />} />
          <Route path="/blogs/new" element={user?<New />:<Navigate to='/login'/>} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-adm" element={<ARegister />} />
          <Route path="/login-adm" element={<ALogin />} />
          <Route path="/admin" element={<Panel />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </userContext.Provider>
    </>
  );
}

export default App;
