const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/dev');
const { auth } = require('./middleware/auth');
const { User } = require("./models/User");

//application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }));


//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World!~~ '))
app.get('/api/hello', (req, res) => res.send('Hello World!~~ '))
app.post('/api/users/register', (req, res) => {


    //회원 가입 할떄 필요한 정보들을  client에서 가져오면 
    //그것들을  데이터 베이스에 넣어준다. 
    const user = new User(req.body)
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/users/login', (req, res) => {
    //find the email from database
    User.findOne({ email: req.body.email }, (err, user) => {
        // console.log('user', user)
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "The system connot find the user"
            })
        }
        //if the email is saved DB, checked password
        user.comparePassword(req.body.password, (err, isMatch) => {
            // console.log('err',err)
            // console.log('isMatch',isMatch)
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Please Check the password again!" })
            //if the password is mached, create a token
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                // Save the created token in a storage 
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id })
            })
        })
    })
})


// role 1 admin    role 2 specific department admin
// role 0 -> user   if role is not role 0, admin
app.get('/api/users/auth', auth, (req, res) => {
    //if Authentication is true
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    // console.log('req.user', req.user)
    User.findOneAndUpdate({ _id: req.user._id },
        { token: "" }
        , (err, user) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            })
        })
})





const port = 5000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))