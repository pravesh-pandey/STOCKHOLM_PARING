const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT, (err, user) => {
            if (err)
                res.status(403).json('token is not right');
            else
            {
                req.user = user;
                next();
            }
        });
    }
    else {
        return res.status(401).json("you are not authenticated");
    }
};
const verifytokenauth = (req, res, next) => {
    verifyToken(req, res, () => {
        // req.user undefined
        if ((req.user.id === req.params.id+process.env.SALT_TOKEN || req.user.isAmin))
            next();
        else
            res.status(403).json('Not allowed');


    });
};
module.exports = { verifytokenauth, verifyToken };