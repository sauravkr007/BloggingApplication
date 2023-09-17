const router = require('express').Router();
const {getAllBlogs,newBlog,getBlog,deleteBlog,editBlog,likeBlog} = require('../controllers/C_Blogs')
const {isAuthenticated} = require('../middlewares/auth')


// get all the blogs
router.get('/', getAllBlogs)

// post a new blog
router.post('/', isAuthenticated, newBlog)

// get a blog
router.get('/:bid', getBlog)

// delete a blog
router.delete('/:bid', isAuthenticated, deleteBlog)

// edit a blog
router.put('/:bid', isAuthenticated, editBlog)

// toggle like a blog post
router.post('/:bid/like', isAuthenticated, likeBlog)


module.exports = router;