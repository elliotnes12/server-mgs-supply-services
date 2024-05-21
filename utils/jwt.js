import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "./constants.js";



function createValidateAccount(email){

    const expToken = new Date();
    expToken.setHours(expToken.getHours() + 24);

    const payload = {
        token_type: "access",
        email: email,
        iat: Math.floor(Date.now() / 1000), // iat debe ser en segundos
        exp: Math.floor(expToken.getTime() / 1000) // exp también debe ser en segundos
    };

  return jwt.sign(payload,JWT_SECRET_KEY);
}


function createAccessToken(user){

    const expToken = new Date();
    expToken.setHours(expToken.getHours() + 24);

    const payload = {
        token_type: "access",
        user_id: user._id,
        iat: Math.floor(Date.now() / 1000), // iat debe ser en segundos
        exp: Math.floor(expToken.getTime() / 1000) // exp también debe ser en segundos
    };

  return jwt.sign(payload,JWT_SECRET_KEY);
}

function createRefreshToken(user){

    const expToken = new Date();

    expToken.setMonth(expToken.getMonth() + 1); // Agrega un mes

    const payload = {
        token_type: "refresh",
        user_id: user._id,
        iat: Math.floor(Date.now() / 1000), // iat debe ser en segundos
        exp: Math.floor(expToken.getTime() / 1000) // exp también debe ser en segundos
    };

    return jwt.sign(payload,JWT_SECRET_KEY);
}

function decode(token){
      return jwt.decode(token,JWT_SECRET_KEY,true);
}

function hasExpiredToken(token){

    try{
        jwt.verify(token,JWT_SECRET_KEY,true);
        return false;
    }catch(error){
        return true;
    }
}


export const token = {
    createAccessToken,
    createRefreshToken,
    decode,
    hasExpiredToken
}