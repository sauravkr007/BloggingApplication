const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Blog = require('../models/Blog');
const SECRET = process.env.SECRET;

// utility functions
const createjwt = async (payload, SECRET) => {
    try {
        if (!payload || !SECRET)
            throw new Error('empty payload or jwt secret not is provided');

        console.log(payload)
        let token = await jwt.sign(payload, SECRET);
        return token;
    } catch (e) {
        console.error(e);
    }
}

const registerU = async (req, res) => {
    try {
        let data = req.body;

        // sanitize the data
        data = Object.assign(data, { isAdmin: false });

        console.log(data);
        let hash = await bcrypt.hash(data.password, 10);
        data = Object.assign(data, { password: hash });

        User.create(data, async (err, nU) => {
            if (!err && nU) {
                let payload = {
                    id: nU._id,
                    email: nU.email,
                    name: nU.name
                }
                let token = await createjwt(payload, SECRET);
                res.cookie("AUTH", token, { httpOnly: true });
                res.json({ result: true, user: nU });
            } else {
                res.json({ result: false });
            }
        })
    } catch (e) {
        res.json({ result: false });
    }
}

const loginU = (req, res) => {
    User.findOne({ email: req.body.email }, async (err, fU) => {
        if (!err && fU && await bcrypt.compare(req.body.password, fU.password)) {

            let payload = {
                id: fU._id,
                email: fU.email,
                name: fU.name
            }

            if (fU.isAdmin) {
                payload = Object.assign(payload, { isAdmin: true })
                res.cookie("AUTH", await createjwt(payload, SECRET), { httpOnly: true });
                res.json({ result: true, user: fU });
                return;
            }

            res.cookie("AUTH", await createjwt(payload, SECRET), { httpOnly: true });
            res.json({ result: true, user: fU });
        } else {
            res.json({ result: false });
        }
    })
}

const ologin = (req, res) => {
    let data = req.body;

    User.findOne({ email: req.body.email }, async (err, fU) => {
        try {
            if (err || fU && !(await bcrypt.compare(data.password, fU.password))) {
                res.json({ result: false });
                return;
            }

            if (!fU) {
                // sanitize the data
                data = Object.assign(data, { isAdmin: false });
                let hash = await bcrypt.hash(data.password, 10);
                data = Object.assign(data, { password: hash });

                User.create(data, async (err, nU) => {
                    if (!err && nU) {
                        let payload = {
                            id: nU._id,
                            email: nU.email,
                            name: nU.name
                        }
                        res.cookie("AUTH", await createjwt(payload, SECRET), { httpOnly: true });
                        res.json({ result: true, user: nU });
                    } else {
                        res.json({ result: false });
                    }
                })
            } else {
                let payload = {
                    id: fU._id,
                    email: fU.email,
                    name: fU.name
                }
                res.cookie("AUTH", await createjwt(payload, SECRET), { httpOnly: true });
                res.json({ result: true, user: fU });
            }
        } catch (e) {
            console.log(e);
            res.json({ result: false });
        }
    })
}

const getUser = (req, res) => {
    User.findById(req.params.uid, (err, fU) => {
        if (!err && fU && !fU.isAdmin && fU._id.equals(req.app.locals.uid) || req.app.locals.isAdmin && !err) {
            res.json(fU);
        } else {
            res.json({ result: false });
        }
    })
}

const deleteUser = (req, res) => {
    User.findById(req.params.uid).exec((err, fU) => {
        if (!err && !fU.isAdmin && req.app.locals.isAdmin) {

            Blog.find({ author: fU._id }).remove((err, fB) => {
                if (!err && fB) {
                    fU.remove();
                    res.json({ result: true });
                } else {
                    res.json({ result: false });
                }
            })

        } else {
            res.json({ result: false });
        }
    })
}

const editUser = (req, res) => {
    try {
        // sanitize the data
        let data = req.body;
        data = Object.assign(data, { isAdmin: false });

        User.findById(req.params.uid).exec((err, fU) => {
            // authorised user
            if (!err && fU && fU._id.equals(req.app.locals.uid)) {
                fU = Object.assign(fU, data);
                fU.save();
                res.json({ result: true });
            }
            else
                res.json({ result: false });
        })
    } catch (e) {
        res.json({ result: false });
    }
}

const getAllUser = (req, res) => {
    if (!req.app.locals.isAdmin) {
        res.json({ result: false });
        return;
    }

    User.find({}, (err, fU) => {
        if (!err) {
            res.json(fU);
        } else {
            res.json({ result: false });
        }
    })
}

const signoutU = (req, res) => {
    res.cookie("AUTH", "", {
        maxAge: 1
    });
    res.json({ result: true });
}

module.exports = { signoutU, loginU, registerU, getUser, getAllUser, editUser, deleteUser, ologin }