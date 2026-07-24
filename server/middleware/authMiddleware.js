import jwt from 'jsonwebtoken';


// * MIDDLEWARE
function authenticateToken(req,res,next) {
    // * We want to get the token, we want to verify it that it is the correct user 
    // * and then we want to return that user to the functiion of get or other things
    // * token are acquired from headers
    const authHeader = req.headers['authorization']; // *from headers we want authorization header
    // * format of header 'Bearer TOKEN'
    const token = authHeader && authHeader.split(' ')[1]; // * it just returns undefined if there is no token
    if (!token) {
        return res.status(401).json({
            message: "Access token is required."
        })
    } 


    // * now we have a token and now we want to verify if we have a valid token.
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error,payload) => {
        if (error) {
            return res.status(401).json({
                message: "Invalid or expired access token"
            }); // * Here it means we have the token but the token is no longer valid
        }
        // * otherwise we have a valid token
        // * hence the user will be rerouted
        req.user = payload; // * this is a payload but not the payload we created earlier
        next();
    })
}

export default authenticateToken;