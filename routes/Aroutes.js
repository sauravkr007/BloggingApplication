const router = require('express').Router();
const admin_login = process.env.admin_login;
const admin_register = process.env.admin_register;
const {loginA, registerA} = require('../controllers/C_Admin')

// admin login
router.post(admin_login,loginA)

// admin_register
router.post(admin_register, registerA)

module.exports = router; 