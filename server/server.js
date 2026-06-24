// ! password creatioin is two step first we need to create a salt and then combine it with password to create hashed password
// ! basically because suppose two user have same password and if some malicious person breaks the code of one it can breaks the code of many
// ! so what salt does is it add before the pssword to create a hash password and there is different salt for different users
// ! and thankfully bcrypt takes care for us these things


import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/usersRoute.js'
import teamMembersRoutes from './routes/teamMembersRoute.js'
import projectsRoutes from './routes/projectsRoute.js'
import subTasksRoutes from './routes/subTasksRoute.js'
import dashboardRoutes from './routes/dashboareRoute.js'
import authenticateToken from './middleware/authMiddleware.js';
import cors from 'cors';


dotenv.config({ path: './.env' });

const app = express();

app.use(cors()) // ? use when all frontend and backend are on different servers.
app.use(express.json()); // * to parse json file

// ! public routes
app.use('/auth', authRoutes); 

// ! public routes

app.use('/api/teamMemberPage', authenticateToken, teamMembersRoutes);
app.use('/api/projectPage', authenticateToken, projectsRoutes);
app.use('/api/subTaskPage', authenticateToken, subTasksRoutes);
app.use('/api/dashboardPage', authenticateToken, dashboardRoutes)


app.listen(3000, ()=>{
    console.log("app is listening.");
})