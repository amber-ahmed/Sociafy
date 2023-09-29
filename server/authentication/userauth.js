import jwt from 'jsonwebtoken'
import config from 'config'
import userModel from '../models/Users/index.js'
async function auth(req, res, next) {
    try {
        let token = req.headers.token
        token = jwt.verify(token, config.get('TOKEN_KEY'))
        let id = token.id
        let userFound = await userModel.findOne({ _id: id });
        if (userFound) {
            req.body.userFound = userFound
            req.body.email = userFound.email
            return next()
        }
        return res.status(498).json({ success: false, msg: "unauthorized access" })

    } catch (error) {
        console.log(error)
        return res.status(401).json({ success: false, msg: 'token error' })
    }

}
export default auth