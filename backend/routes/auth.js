const express = require('express');
const router = express.Router();
const UserController = require('../database/controller/user.controller')

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