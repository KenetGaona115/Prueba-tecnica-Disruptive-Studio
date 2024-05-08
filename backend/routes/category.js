const express = require('express');
const router = express.Router();
const CategoryController = require('../database/controller/category.controller')

router.post('/', async (req, res) => {
    try {
        const body = req.body;
        const validate = await CategoryController.findOne({ nombre: body.nombre });
        if (validate)
            return res.json({ success: false, message: 'La categoria ya existe' });
        const cat = await CategoryController.create(req.body);
        return res.json({ succes: true, categoria: cat });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, error: 'Error al crear usuario' });
    }
});
router.put('/:id?', async (req, res) => {
    try {
        const id = req.query.id;

        if (!id)
            return res.send({ message: "Id de categoria invalido" })

        const body = req.body;
        const cat = CategoryController.update({ _id: _id }, body);;
        return res.json({ succes: true, categoria: cat });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, error: 'Error al crear usuario' });
    }
});

router.get('/', async (req, res) => {
    try {
        const collection = await CategoryController.findAll();
        return res.json({ succes: true, categoria: collection });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, error: 'Error al crear usuario' });
    }
});

router.delete('/:id?', async (req, res) => {
    try {
        const id = req.query.id
        if (!id)
            return res.send({ message: "Id de categoria invalido" })
        await CategoryController.delete({ _id: id });
        return res.json({ succes: true, message: "Categoria eliminada" });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, error: 'Error al crear usuario' });
    }
});


module.exports = router;