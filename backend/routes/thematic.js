const express = require('express');
const router = express.Router();
const ThematicController = require('../database/controller/thematic.controller')

router.post('/', async (req, res) => {
    try {
        const body = req.body;
        const validate = await ThematicController.findOne({ nombre: body.nombre });
        if (validate)
            return res.json({ success: false, message: 'El tema ya existe' });
        const tematica = await ThematicController.create(req.body);
        return res.json({ succes: true, tema: tematica });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, error: 'Error al crear tematica' });
    }
});

router.get('/', async (req, res) => {
    try {
        const collection = await ThematicController.findAll();
        return res.json({ succes: true, temas: collection });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, error: 'Error al obtener tematicas' });
    }
});



module.exports = router;