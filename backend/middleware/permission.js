const userController = require('../database/controller/user.controller');

async function PERMISSIONS_MIDDLEWARE(req, res, next) {
    try {
        const user = await userController.findOne({ email: req.body.email });
        if (user) {
            if (user.tipoUsuario == 'admin') {
                req.body.userType = 'admin';
            } else if (user.tipoUsuario === 'creador') {
                req.body.userType = 'creador';
            } else {
                req.body.userType = 'lector';
            }
            next();
        }
        else
            return res.json({ success: false, error: 'Error al autenticar usuario.' });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, error: 'Error al autenticar usuario.' });
    }
}

async function PERMISSIONS_FILE_MIDDLEWARE(req, res, next) {
    try {
        const { email } = JSON.parse(req.body.email);
        const user = await userController.findOne({ email: email });
        if (user.tipoUsuario == 'lector') {
            return res.json({ success: false, error: 'Error al autenticar usuario.' });
        }
        else
            next();
    } catch (error) {
        console.error(error);
        return res.json({ success: false, error: 'Error al autenticar usuario.' });
    }
}

async function PERMISSIONS_DELETE_MIDDLEWARE(req, res, next) {
    try {
        const user = await userController.findOne({ email: req.query.email });
        if (user.tipoUsuario != 'admin') {
            return res.json({ success: false, error: 'Error al autenticar usuario.' });
        }
        else
            next();
    } catch (error) {
        console.error(error);
        return res.json({ success: false, error: 'Error al autenticar usuario.' });
    }
}

module.exports = {
    PERMISSIONS_MIDDLEWARE,
    PERMISSIONS_DELETE_MIDDLEWARE,
    PERMISSIONS_FILE_MIDDLEWARE
}