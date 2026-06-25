import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/usersModel.js';
import dotenv from 'dotenv'

dotenv.config({path: '../.env'})

// ! Register Function
const register = async (req,res) => {
    try {
        // const salt = await bcrypt.genSalt()// ! we can add round here the defaut is 10 the larger the numver the longer it will take to generate the hash but the more secure it will be 20 takes dauys
       //  const hashedPassword = await bcrypt.hash(req.body.password,salt)
        // *Shorter version
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // console.log(salt);
        console.log(hashedPassword);
    
        await userModel.createUser(req.body.username, req.body.email, hashedPassword, req.body.name);

         res.status(201).send()
     } catch(err) {
         console.log(err);
         res.status(500).json({
             error: err.message
         })
     
     // ! by this code everytime we send the post request we get a differnt hsh password because of the salt
     }
}



// ! login function
const login = async (req,res) => {
    try {
        
        const user = await userModel.findUserByUsername(req.body.username);
        if(user == null) {
            return res.status(400).send('Cannot find user');
        }
        if( await bcrypt.compare(req.body.password, user.password)) {
            // ! only when the authentication is done do we authorize the user
            const payload = {
                id: user.id,
                username: user.username
            }
            // * Creating JSON web token
            const accessToken = generateAccessToken(payload)// * sign take our payload
            
            // * As its gonna expire we wanna create a refresh token
            const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET) // * WE don't want to put an expiration date on refresh token as we don't want to let the jwt handle it, we want to handle it manually.

            // * Adding refreh token in the database
            
            const result = await userModel.updateRefreshToken(refreshToken, user.username);

            console.log(result);


            res.status(200).json({accessToken: accessToken, refreshToken: refreshToken});
        } else {
            res.status(401).send("Not allowed")
        }

       

    } catch(err) {
        console.log(err);
        res.status(500).json({
            error: err.message
        })
    }
}


// ! Refresh Token
// * We have the option to invalidate the refresh token.

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '5m'})
}


// ! handle refreshToken
const handleRefreshToken = async (req,res)=>{
    try {
        const refreshToken = req.body.token

        /* 
        * Request will look like this
        * POST http://localhost:4000/token
        * Content-Type: application/json
        * 
        * {
        *   "token": "" from database it will come
        * }
        */

        if(refreshToken == null) return res.sendStatus(401)

       // * do we have a valid refresh token
       
        
        const user = await userModel.findUserByRefreshToken(refreshToken);
        if(!user){
            return res.sendStatus(403);
        }
        
       jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload)=>{
        console.log('Verify error:', err);
        console.log('Payload:', payload);

           if(err) return res.sendStatus(403)
            const accessToken = generateAccessToken({id: payload.id, username: payload.username})
        res.json({accessToken: accessToken})
        })
    } catch (error) {
        console.log(error);
        res.status(501).json({error:error.message})
    }
}

// ! logout
const logout = async (req,res)=>{
    try {
        const refreshToken = req.body.token;
        console.log("-> Received from Client:", refreshToken);
    
        await userModel.refreshTokenToNull(refreshToken);
        res.sendStatus(204)
    } catch (error) {
        console.log(error)
        res.status(501).json({error:error.message})
    }
}


export default {
    register,
    login,
    handleRefreshToken,
    logout
}