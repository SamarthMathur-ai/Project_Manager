// ! password creatioin is two step first we need to create a salt and then combine it with password to create hashed password
// ! basically because suppose two user have same password and if some malicious person breaks the code of one it can breaks the code of many
// ! so what salt does is it add before the pssword to create a hash password and there is different salt for different users
// ! and thankfully bcrypt takes care for us these things


import dotenv from 'dotenv';
const result = dotenv.config();

import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors()) // ? use when all frontend and backend are on different servers.
app.use(express.json()); // * to parse json file


// Import routes AFTER dotenv has loaded
const { default: authRoutes } = await import("./routes/usersRoute.js");
const { default: teamMembersRoutes } = await import("./routes/teamMembersRoute.js");
const { default: projectsRoutes } = await import("./routes/projectsRoute.js");
const { default: subTasksRoutes } = await import("./routes/subTasksRoute.js");
const { default: dashboardRoutes } = await import("./routes/dashboareRoute.js");
const { default: authenticateToken } = await import("./middleware/authMiddleware.js");


if(result.error) {
    console.error("Failed to load .env:", result.error);
    process.exit(1);
}


// ! public routes
app.use('/auth', authRoutes); 

// ! public routes

app.use('/api/teamMemberPage', authenticateToken, teamMembersRoutes);
app.use('/api/projectPage', authenticateToken, projectsRoutes);
app.use('/api/subTaskPage', authenticateToken, subTasksRoutes);
app.use('/api/dashboardPage', authenticateToken, dashboardRoutes)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});