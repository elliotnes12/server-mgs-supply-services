import { token } from "../utils/index.js";


function asureAuth(req,resp,next){
  
    if(!req.headers.authorization){
        return resp.status(400).send({msg:"Error en la autenticacion"});
    }
    
    const accessToken = req.headers.authorization.replace("Bearer ","").trim();

    if(token.hasExpiredToken(accessToken)){
        return resp.status(400).send({msg:"Error en la autenticacion"});
    }

    req.user = token.decode(accessToken);

    next(); 
}   

export const mdAuth = {
    asureAuth
}