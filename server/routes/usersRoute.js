import express from 'express';
import authController from '../controller/usersController.js'

const router = express.Router(); // * creates a container which has all the routes of the file.

// ! Register route
router.post('/userRegister', authController.register); // * () don't put this as it will then call all the time.


// ! Login route
router.post('/userLogin', authController.login);


// ! Refresh Token Route
router.post('/newRefreshToken', authController.handleRefreshToken);


// ! Logout route
router.post('/userLogout', authController.logout);

export default router;