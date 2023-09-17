const router = require('express').Router();
const {signoutU,loginU,registerU,getUser,getAllUser,editUser,deleteUser,ologin} = require('../controllers/C_User')
const {isAuthenticated} = require('../middlewares/auth')

// signout
router.get('/signout', signoutU)

// get all the Users
router.get('/', isAuthenticated, getAllUser)

// create/register a new User
router.post('/register', registerU)

// login user
router.post('/login', loginU)

// oauth sign in
router.post('/ologin',ologin)

// get a User
router.get('/:uid', isAuthenticated, getUser)

// delete a User
router.delete('/:uid', isAuthenticated, deleteUser)

// edit a User
router.put('/:uid', isAuthenticated, editUser)

module.exports = router;