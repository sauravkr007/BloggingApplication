require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const M_URI = process.env.M_URI;
const PORT = process.env.PORT;
const M_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
};

const Broutes = require('./routes/Broutes');
const Uroutes = require('./routes/Uroutes');
const Aroutes = require('./routes/Aroutes');
const cookieParser = require('cookie-parser');  
const cors = require('cors');

mongoose.connect(M_URI,M_OPTIONS).then(() => {
    console.log('database connected');
}).catch(err =>{
    console.log(err);
})

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());


if(process.env.NODE_ENV === 'production')
    app.use(express.static('./frontend/build'))

app.use('/api/blogs',Broutes);
app.use('/api/users',Uroutes);
app.use('/api/admin',Aroutes);

app.get("*",(req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
})

app.listen(PORT,()=>{
    console.log('listening on port '+PORT);
});