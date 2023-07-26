const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config();
const port = process.env.PORT || 5000
const authRouter = require('./Routes/authRoute')
const postRouter = require('./Routes/PostRoute')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const multer = require('multer')

app.use(express.json())
app.use(cors({credentials:true, origin: 'http://localhost:3000' }))
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../frontend/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  })

const upload = multer({ storage })

app.post('/api/upload', upload.single('file'), function (req, res) {
    res.status(200).json(req.file.filename);
})


app.use('/api/user', authRouter)
app.use('/api/posts', postRouter)


app.listen(port, () => {
    console.log('connected with backend')
});