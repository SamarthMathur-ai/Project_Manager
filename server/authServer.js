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


// ! using a refresh token to create a new access token
app.post('/token', async (req,res)=>{
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
        const sql = `
                 SELECT * FROM user WHERE refresh_token = ?;
        `
        
        const [table] = await db.query(sql,[
           refreshToken
    ])
        
        const user = table[0];
        if(!user){
            console.log('DB Result:', table);
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

})


app.post('/users', async (req, res)=>{// * bcrypt is an asynchronous library.
    try {
       // const salt = await bcrypt.genSalt()// ! we can add round here the defaut is 10 the larger the numver the longer it will take to generate the hash but the more secure it will be 20 takes dauys
      //  const hashedPassword = await bcrypt.hash(req.body.password,salt)
        // *Shorter version
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // console.log(salt);
        console.log(hashedPassword);
        
        const sql = `
            INSERT INTO user (username, email, password, name)
            VALUES(?,?,?,?)
        `;

        await db.query(sql, [
            req.body.username,
            req.body.email,
            hashedPassword,
            req.body.name
        ])


        res.status(201).send()
    } catch(err) {
        console.log(err);
        res.status(500).json({
            error: err.message
        })
    }
    // ! by this code everytime we send the post request we get a differnt hsh password because of the salt
})


app.post('/logout',async (req,res)=> {
    try {
        const refreshToken = req.body.token;
        console.log("-> Received from Client:", refreshToken);
    const sql = `
        UPDATE user SET refresh_token = NULL WHERE refresh_token = ?
    `
    await db.query(sql,[
        refreshToken
    ]);

    res.sendStatus(204)
    } catch (error) {
        console.log(error)
        res.status(501).json({error:error.message})
    }
})

app.post('/users/login',async (req, res) => {
    
    try {
        const sql = `
            SELECT * FROM user WHERE username = ?;
        `;
        const [rows] = await db.query(sql,[
          req.body.username  
        ])
        const user = rows[0];
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
            const [result] = await db.query(`
                UPDATE user SET refresh_token = ? WHERE username = ?
            `, [refreshToken, user.username]);

            console.log(result);


            res.json({accessToken: accessToken, refreshToken: refreshToken});
        } else {
            res.send("Not allowed")
        }

       

    } catch(err) {
        console.log(err);
        res.status(500).json({
            error: err.message
        })
    }
})



// ! Refresh Token
// * We have the option to invalidate the refresh token.

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1m'})
}



// app.get('/login',(re))
app.listen(4000);