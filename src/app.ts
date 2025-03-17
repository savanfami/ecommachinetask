import express from 'express'
import morgan from 'morgan'
import { PORT } from './config/connection'
const app=express()

app.use(express.json())
app.use(morgan('dev'))







app.listen(PORT,()=>{
    console.log(`server listening on PORT http://localhost:${PORT}`)
})