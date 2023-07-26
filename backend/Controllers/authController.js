const db = require("../database/config")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userRegister = (req, res) => {
    const q = 'SELECT * FROM users WHERE username = ? OR email = ?'
    db.query(q, [req.body.username, req.body.email], (err, data) => {
        if (err) return res.json(err);
        if (data.length) return res.status(409).json("User is already exists");


        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = 'INSERT INTO users(`username`,`email`,`password`) VALUES (?) '

        const values = [
            req.body.username,
            req.body.email,
            hash
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.json(err);

            return res.status(200).json("user has been created")
        })
    })
}


const userLogin = (req, res) => {
    const q = 'SELECT * FROM users WHERE username = ?'

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json("User not found")

        const isPassword = bcrypt.compareSync(req.body.password, data[0].password)

        if (!isPassword) return res.status(404).json("Username or Password is incorrect")

        const token = jwt.sign({ id: data[0].id }, "balajiaadi" ,{expiresIn: '1d'})

        const { password, ...other } = data[0]

        res.cookie('accessToken', token, {
            httpOnly: true,
            sameSite : 'strict',
            maxAge : 1 * 24 * 60 * 60 * 1000
        }).status(200).json(other);
    })
}

const userLogout = (req,res) => {
    res.clearCookie('accessToken' , {
        sameSite : "none",
        secure : true,
        domain: "localhost",

    }).status(200).json("User has been logout")
}



module.exports = { userRegister, userLogin, userLogout }