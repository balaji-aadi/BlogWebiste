const db = require("../database/config")
const jwt = require('jsonwebtoken')

const getPosts = (req,res) => {
    const q = req.query.cat ? 'SELECT * FROM posts WHERE cat = ? ' : 'SELECT * FROM posts ORDER BY date DESC'

    db.query(q,[req.query.cat],(err,data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    })
}

const getPost = (req,res) => {
    const q = 'SELECT `username`, `title`,`desc`, p.img, u.img AS userImg ,  `date`,`cat` FROM posts p JOIN users u ON u.id = p.uid WHERE p.id = ? '


    db.query(q,[req.params.id], (err,data) => {
        if(err) return res.json(err)

        return res.status(200).json(data[0])
    })
}


const deletePost = (req,res) => {
    const token = req.cookies.accessToken;

    if(!token) return res.status(401).json("Token is invalid")

    jwt.verify(token, 'balajiaadi' , (err,userInfo) => {
        if(err) return res.status(403).json("Token is not valid");

        const postId = req.params.id;
        const q = 'DELETE FROM posts WHERE `id` = ? AND `uid` = ?'

        db.query(q,[postId,userInfo.id], (err,data) => {
            if(err) return res.status(403).json("You can delete only your posts");

            return res.status(200).json("Post has been deleted");
        })
    })
}


const addPost = (req,res) => {
    const token = req.cookies.accessToken;
    
    if(!token) return res.status(401).json("Not Authenticated")

    jwt.verify(token, 'balajiaadi' , (err,userInfo) => {
        if(err) return res.status(403).json("Token is not valid");

        const q = 'INSERT INTO posts(`title`,`desc`,`img`,`cat`,`date`,`uid`) VALUES (?) '

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            req.body.date,
            userInfo.id,
        ]

        db.query(q,[values],(err,data) => {
            if(err) return res.status(404).json(err);

            return res.status(200).json("Post has been created");
        })
    })
}

const updatePost = (req,res) => {
    const token = req.cookies.accessToken;

    if(!token) return res.status(401).json("Not Authenticated");

    jwt.verify(token, 'balajiaadi' , (err,userInfo) => {
        if(err) return res.status(403).json("token is not valid");

        const postId = req.params.id;

        const q = 'UPDATE posts SET `title` = ? ,`desc` = ? , `img` = ? , `cat` = ? WHERE `id` = ? AND `uid` = ? ';

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
        ]

        db.query(q,[...values, postId, userInfo.id] , (err, data) => {
            if(err) return res.status(500).json(err);

            return res.status(200).json(data);
        })

    })
}


module.exports = {getPosts,getPost,deletePost,addPost,updatePost}