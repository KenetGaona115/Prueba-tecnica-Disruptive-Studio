const express = require('express');
const router = express.Router();
const UserController = require('../database/controller/user.controller')

router.post('/', async (req, res) => {
    try {
        const body = req.body;
        const validate = await UserController.findOne({ email: body.email, alias: body.alias });
        if (validate)
            return res.json({ success: false, message: 'El usuario con correo o Alias proporcionado ya estan registrado' });
        const nuevoUsuario = await UserController.create(req.body);
        return res.json({ success: true, user: nuevoUsuario });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, error: 'Error al crear usuario' });
    }
});

module.exports = router;