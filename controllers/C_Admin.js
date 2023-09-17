const User = require('../models/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const SECRET = process.env.SECRET;
const GRANT_TOKEN = process.env.GRANT_TOKEN;

// utility functions
const createjwt = async (payload,SECRET) =>{
    try{
        if(!payload || !SECRET)
            throw new Error('empty payload or jwt secret not is provided');

        console.log(payload)
        let token = await jwt.sign(payload,SECRET);
        return token;
    }catch(e){
        console.error(e);
    }
}

const registerA = async (req, res)=>{
    let data = req.body;
    let adm_grant_token = req.body.grant_token
    if(adm_grant_token!==GRANT_TOKEN){
        res.json({result: false});
        return;
    }

    User.findOne({email: data.email},async (err, fU) => {
        if(!err && fU && await bcrypt.compare(req.body.password,fU.password)) {
            fU.isAdmin = true;
            fU.save();

            let payload = {
                id: fU._id,
                email: fU.email,
                isAdmin: true,
                name: fU.name 
            }
            
            let token = await createjwt(payload,SECRET);
            res.cookie("AUTH",token,{httpOnly:true});
            res.json({result: true, user: fU});
        }else{
            res.json({result: false});
        }
    })
}

const loginA = (req, res) =>{
    User.findOne({email: req.body.email},async (err, fU) => {
        if(!err && fU && fU.isAdmin && await bcrypt.compare(req.body.password,fU.password)) {
            
            let payload = {
                id: fU._id,
                email: fU.email,
                isAdmin: true,
                name: fU.name 
            }

            res.cookie("AUTH",await createjwt(payload,SECRET),{httpOnly:true});
            res.json({result: true, user: fU});
        }else{
            res.json({result: false});
        }
    })
}

module.exports = {loginA, registerA}