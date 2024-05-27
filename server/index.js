const express = require('express')
const app = express()

const userRoutes =  require("./routes/Users")
const profileRoutes =  require("./routes/Profile")
const paymentRoutes =  require("./routes/Payments")
const courseRoutes =  require("./routes/Course")

const database = require("./config/database")
const cookieParser = require("cookie-parser")
const cors = require('cors')
const {cloudinaryConnect} = require("./config/cloudinary")
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')

dotenv.config()
const PORT = process.env.PORT || 4000

database.connect()

app.use(express.json())
app.use(cookieParser())
const allowedOrigins = ["https://studynotion-afs.onrender.com"];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
  },
  methods: 'GET,POST,PUT,DELETE,HEAD,PATCH',
  allowedHeaders: 'Content-Type',
  credentials: true,
  
}));

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

cloudinaryConnect()

app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/profile", profileRoutes)
app.use("/api/v1/payment", paymentRoutes)
app.use("/api/v1/course", courseRoutes)

app.get("/", (req,res) => {
    return res.json({
        success: true,
        message: "your server is running...."
    })
})

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
})





 
