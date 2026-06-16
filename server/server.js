import dotenv from 'dotenv';
import express from 'express'
import bcrypt from 'bcrypt'
import db from './config/dbConnection.js'
// ! password creatioin is two step first we need to create a salt and then combine it with password to create hashed password
// ! basically because suppose two user have same password and if some malicious person breaks the code of one it can breaks the code of many
// ! so what salt does is it add before the pssword to create a hash password and there is different salt for different users
// ! and thankfully bcrypt takes care for us these things
import jwt from 'jsonwebtoken'
const app = express();
dotenv.config({ path: './server/.env' }); // * as it is inside server but we are using vs code from project root.
app.use(express.json()) // *to parse the json file

const posts = [
    {
        username: 'Kyle',
        title: 'Post 1'
    },
    {
        username: 'Jim',
        title: 'Post 2'
    }
]

const users = []

app.get('/posts',authenticateToken, async (req,res)=> {
    try {
        const sql = `
            SELECT * FROM user WHERE username = ?;
        `
        const [users] = await db.query(sql,[
            req.user.username // ! here req is the middleware authtoken only.
        ]);
        console.log(users);
        res.status(201).send(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error:error.message
        })
    }
})


// * MIDDLEWARE
function authenticateToken(req,res,next) {
    // * We want to get the token, we want to verify it that it is the correct user 
    // * and then we want to return that user to the functiion of get or other things
    // * token are acquired from headers
    const authHeader = req.headers['authorization']; // *from headers we want authorization header
    // * format of header 'Bearer TOKEN'
    const token = authHeader && authHeader.split(' ')[1]; // * it just returns undefined if there is no token
    if (token == null) return res.sendStatus(401);


    // * now we have a token and now we want to verify if we have a valid token.
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) => {
        if (err) return res.sendStatus(403); // * Here it means we have the token but the token is no longer valid
        // * otherwise we have a valid token
        // * hence the user will be rerouted
        req.user = user; // * this is a payload but not the payload we created earlier
        next();
    })
}

// app.get('/login',(re))
app.listen(3000);