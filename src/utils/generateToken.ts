// import jwt from 'jsonwebtoken'
// import { config } from 'dotenv'

// config()

// const accesSecret = process.env.JWT_SECRET as string
// const refreshSecret = process.env.REFRESH_SECRET as string
// console.log(accesSecret, 'secret key')

// export const generateAccesstoken = (userId: string) => {
//     try {
//         return jwt.sign({ id }, accesSecret, { expiresIn: '15m' })
//     } catch (error) {
//         throw new Error('failed to access  token')

//     }
// }



// export const generateRefreshToken = (userId: string) => {
//     try {
//         return jwt.sign({ id }, refreshSecret, {
//             expiresIn: '7d',
//         });
//     } catch (error) {
//         throw new Error('failed to refresh  token')

//     }
// };

