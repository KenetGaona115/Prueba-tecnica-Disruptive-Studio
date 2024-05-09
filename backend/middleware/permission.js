const userController = require('../database/controller/user.controller');

async function PERMISSIONS_MIDDLEWARE(req, res, next) {
    try {
        const user = await userController.findOne({email: req.body.email});
        if(user) {
            if(user.tipoUsuario == 'admin') {
                req.body.userType = 'admin';
            } else if(user.tipoUsuario === 'creador') {
                req.body.userType = 'creador';
            } else {
                req.body.userType = 'lector';
            }
            next();
        }
    } catch (error) {
        console.error(error);
        return res.json({ success: false, error: 'Error al autenticar usuario.' });
    }
}

module.exports = {
    PERMISSIONS_MIDDLEWARE
}