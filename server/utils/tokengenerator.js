import jwt from 'jsonwebtoken'
import config from 'config'
function tokenGenerator(payload,expiry){
    let token = jwt.sign(payload,config.get("TOKEN_KEY"),{expiresIn : expiry})
    return token
}
export default tokenGenerator