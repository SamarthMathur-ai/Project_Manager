// ! password creatioin is two step first we need to create a salt and then combine it with password to create hashed password
// ! basically because suppose two user have same password and if some malicious person breaks the code of one it can breaks the code of many
// ! so what salt does is it add before the pssword to create a hash password and there is different salt for different users
// ! and thankfully bcrypt takes care for us these things


import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/usersRoute.js'
import teamMembersRoutes from './routes/teamMembersRoute.js'
import authenticateToken from './middleware/authMiddleware.js';

dotenv.config({ path: './.env' });

const app = express();
app.use(express.json()); 

// ! public routes
app.use('/auth', authRoutes);

// ! public routes

app.use('/api/teamMemberPage', authenticateToken, teamMembersRoutes);
// app.use('/api/projects', authenticateToken, projectRoutes);
app.get('/api/projects', authenticateToken, (req, res) => {
    // If the code reaches this line, the token is perfectly valid!
    res.status(200).json({
        message: "Success! You have officially bypassed the bouncer.",
        userDecodedFromToken: req.user,
        projects: ["Project 1", "Project 2"] // Just dummy data for now
    });
});

app.listen(3000, ()=>{
    console.log("app is listening.");
})