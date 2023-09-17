const Blog = require('../models/Blog')
const User = require('../models/User');

const getAllBlogs = (req,res) => {
    try {
        console.log(req.query.author)

        let q = {};
        if (req.query.author)
            q = Object.assign(q, { author: req.query.author })
        if (req.query.q)
            q = Object.assign(q, { $text: { $search: req.query.q } })

        console.log(q)

        Blog.find(q).sort({ "updatedAt": -1 }).exec((err, fB) => {
            if (!err && fB) {
                res.json({ data: fB, result: true });
            } else {
                console.log(err)
                res.json({ result: false });
            }
        })
    } catch (e) {
        res.json({ result: false });
    }
}

const getBlog = (req, res) => {
    Blog.findById(req.params.bid, (err, fB) => {
        if (!err) {
            res.json(fB);
        } else {
            res.json({ result: false });
        }
    })
}

const newBlog =  (req, res) => {
    try{
        let data = req.body
        data = Object.assign(data, { author: req.app.locals.uid, authorName: req.app.locals.name })
    
        Blog.create(data, (err, nB) => {
            if (!err && nB) {
                res.json({ result: true });
            } else {
                res.json({ result: false });
            }
        })
    }catch(e){
        res.json({ result: false });
    }
}

const deleteBlog = (req, res) => {
    Blog.findById(req.params.bid).populate('author').exec(async (err, fB) => {
        try {
            if (!err && fB) {
                if (!fB.author._id.equals(req.app.locals.uid) && !req.app.locals.isAdmin) {
                    res.json({ result: false });
                    return;
                }
                fB.remove();
                res.json({ result: true });
            } else {
                res.json({ result: false });
            }
        } catch (e) {
            res.json({ result: false });
        }
    })
}

const editBlog =  (req, res) => {
    console.log(req.app.locals.isAdmin)
    console.log(req.app.locals.uid)
    Blog.findById(req.params.bid).populate('author').exec(async (err, fB) => {
        try {
            if (!err) {
                if (!fB.author._id.equals(req.app.locals.uid) && !req.app.locals.isAdmin) {
                    res.json({ result: false, message: "not authorised" });
                    return;
                }

                let data = req.body;
                // data = Object.assign(data,{last_modified: new Date});
                fB = Object.assign(fB, data);
                await fB.save();
                res.json({ result: true });
            }
            else
                res.json({ result: false, message: "internal server error_DB" });
        } catch (e) {
            res.json({ result: false, message: "internal server error" });
        }
    })
}

const likeBlog = (req, res) => {

    Blog.findById(req.params.bid, (err, fB) => {
        if (!err && fB) {
            User.findById(req.app.locals.uid, (err, fU) => {
                if (!err && fU) {

                    let present = false;

                    for (let i = 0; i < fU.liked.length; i++) {
                        if (fU.liked[i].equals(fB._id)) {
                            fB.likes = fB.likes - 1;
                            fU.liked.splice(i, 1);
                            present = true;
                            break;
                        }
                    }
                    if (!present) {
                        fB.likes = fB.likes + 1;
                        fU.liked.push(fB._id);
                    }

                    fB.save();
                    fU.save();
                    res.json({ result: true });
                }
                else {
                    res.json({ result: false });
                }
            })
        } else
            res.json({ result: false });
    })
}

module.exports = {likeBlog,editBlog,deleteBlog,getBlog,getAllBlogs,newBlog}