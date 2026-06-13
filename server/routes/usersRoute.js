import express from 'express';

const router = express.Router();

router.post("/userSignUp", userSignUp);

router.post("/userLogin", userLogin);

export default router;