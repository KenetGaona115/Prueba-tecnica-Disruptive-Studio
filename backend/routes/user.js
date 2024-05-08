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
        return res.json({ succes: true, user: nuevoUsuario });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, error: 'Error al crear usuario' });
    }
});

// app.put('/:id', async (req, res) => {
//     try {
//         const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!usuario) {
//             return res.status(404).send('Usuario no encontrado');
//         }
//         res.json(usuario);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error al actualizar usuario');
//     }
// });

// app.delete('/usuarios/:id', async (req, res) => {
//     try {
//       await Usuario.findByIdAndDelete(req.params.id);
//       res.json({ message: 'Usuario eliminado' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error al eliminar usuario');
//     }
//   });

module.exports = router;