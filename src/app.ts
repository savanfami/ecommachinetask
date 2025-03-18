import express, { Application } from 'express'
import morgan from 'morgan'
import { PORT } from './config/connection'
import cookieParser from 'cookie-parser'
import routes from './routes/routes'
import { errorHandler } from './utils/common/errorHandler'


const app: Application = express()



app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))



app.use('/api', routes);



app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`server listening on PORT http://localhost:${PORT}`)
})

export default app