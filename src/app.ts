import express,{Application} from 'express'
import morgan from 'morgan'
import { PORT } from './config/connection'
import cookieParser from 'cookie-parser'
import authroutes from './routes/authRoutes'
const app:Application=express()


app.use(cookieParser())
app.use(express.json())
app.use(morgan('dev'))




app.use('/api/auth',authroutes)

 

app.listen(PORT,()=>{
    console.log(`server listening on PORT http://localhost:${PORT}`)
})

export default app