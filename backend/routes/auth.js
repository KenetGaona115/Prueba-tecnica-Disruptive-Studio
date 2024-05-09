const express = require('express');
const router = express.Router();
const UserController = require('../database/controller/user.controller')

/**
 * POST /login (Iniciar sesión)
 *
 * Este endpoint permite que un usuario inicie sesión con sus credenciales.
 *
 * Inputs:
 * - req.body: Un objeto que contiene los datos de inicio de sesión, como `email` o `alias` y `password`.
 *
 * Outputs:
 * - res.send(): Devuelve un objeto JSON con una propiedad `success` (boolean) que indica si el login fue exitoso,
 *   y una propiedad `user` (objeto) con información sobre el usuario autenticado, o una propiedad `message` con información sobre errores.
 */
router.post('/login', async function (req, res) {
    try {
        const body = req.body;
        const user = await UserController.login(body)
        if(user.password === body.password)
            return res.send({ success: true, user });
        else 
            return res.send({success: false, message: "Credenciales incorrectas"})
    } catch (error) {
        return res.send({ success: false, message: "Erro al iniciar sesion" })
    }
})

module.exports = router;