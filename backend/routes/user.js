const express = require('express');
const router = express.Router();
const UserController = require('../database/controller/user.controller')

/**
 * POST / (Crear nuevo usuario)
 *
 * Este endpoint crea un nuevo usuario, pero primero verifica si ya existe un usuario con el mismo correo electrónico o alias.
 *
 * Inputs:
 * - req.body: Un objeto que contiene los datos del usuario a crear, como `email` y `alias`.
 *
 * Outputs:
 * - res.json(): Devuelve un objeto JSON con una propiedad `success` (boolean) que indica si la operación tuvo éxito,
 *   y una propiedad `user` (objeto) con información sobre el nuevo usuario creado, o una propiedad `message` con información sobre errores.
 */
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