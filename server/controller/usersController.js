import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/usersModel.js';



// ! Register Function
const register = async (req,res) => {
    try {
        const { username, email, password, name } = req.body;

        if (!username || !email || !password || !name) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }
        // const salt = await bcrypt.genSalt()// ! we can add round here the defaut is 10 the larger the numver the longer it will take to generate the hash but the more secure it will be 20 takes dauys
       //  const hashedPassword = await bcrypt.hash(req.body.password,salt)
        // *Shorter version
        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(salt);
    
        await userModel.createUser(username, email, hashedPassword, name);

         return res.status(201).json({
            message: "User registered Successfully."
         });
     } catch(err) {
         console.error(err);
         return res.status(500).json({
             message: "Internal Server Error"
         })
     
     // ! by this code everytime we send the post request we get a differnt hsh password because of the salt
     }
}



// ! login function
const login = async (req,res) => {
    const{ username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required."
        })
    }
    
    try {
        
        const user = await userModel.findUserByUsername(username);
        if(user == null) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        if( await bcrypt.compare(password, user.password)) {
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
            
            await userModel.updateRefreshToken(refreshToken, user.username);


            return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken});
        } else {
            return res.status(401).json({
                message: "Invalid username or password."
            });
        }

       

    } catch(err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


// ! Refresh Token
// * We have the option to invalidate the refresh token.

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '2m'})
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

        if(!refreshToken) return res.sendStatus(401)

       // * do we have a valid refresh token
       
        
        const user = await userModel.findUserByRefreshToken(refreshToken);
        if(!user){
            return res.sendStatus(403);
        }
        
       jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload)=>{
           if(err) return res.sendStatus(403)
            const accessToken = generateAccessToken({id: payload.id, username: payload.username})
        return res.json({accessToken: accessToken})
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Server Error"})
    }
}

// ! logout
const logout = async (req,res)=>{
    try {
        const refreshToken = req.body.refreshToken;
        if (!refreshToken) {
            return res.status(400).json({
                message: "Refresh token is required."
            });
        }
        const result = await userModel.refreshTokenToNull(refreshToken);

        if (result === 0) {
            return res.status(404).json({
                message: "Refresh token not found."
            });
        }
        return res.sendStatus(204)
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}



export default {
    register,
    login,
    handleRefreshToken,
    logout
}