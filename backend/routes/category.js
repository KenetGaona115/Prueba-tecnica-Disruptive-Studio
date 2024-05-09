const express = require('express');
const router = express.Router();
const CategoryController = require('../database/controller/category.controller')
const { PERMISSIONS_MIDDLEWARE } = require('../middleware/permission')

router.post('/', PERMISSIONS_MIDDLEWARE, async (req, res) => {
    try {
        const body = req.body;
        const validate = await CategoryController.findOne({ nombre: body.nombre });
        if (validate)
            return res.json({ success: false, message: 'La categoria ya existe' });
        if (body.userType === 'admin') {
            const cat = await CategoryController.create({ nombre: body.nombre });
            return res.json({ success: true, categoria: cat });
        } else {
            return res.json({ success: false, message: 'El usuario no es de tipo admin', status: 403 });
        }
    } catch (error) {
        console.error(error);
        return res.json({ success: false, error: 'Error al crear usuario' });
    }
});
router.put('/:id?', PERMISSIONS_MIDDLEWARE, async (req, res) => {
    try {
        const id = req.query.id;

        if (!id)
            return res.send({ message: "Id de categoria invalido" })

        const body = req.body;
        if (body.userType === 'admin') {
            const cat = CategoryController.update({ _id: _id }, body);
            return res.json({ success: true, categoria: cat });
        } else {
            return res.json({ success: false, message: 'La categoria ya existe', status: 403 });
        }
    } catch (error) {
        console.error(error);
        return res.json({ success: false, error: 'Error al crear usuario' });
    }
});

router.get('/', async (req, res) => {
    try {
        const collection = await CategoryController.findAll();
        return res.json({ success: true, categoria: collection });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, error: 'Error al crear usuario' });
    }
});

router.delete('/:id?', PERMISSIONS_MIDDLEWARE, async (req, res) => {
    try {
        const id = req.query.id
        if (!id)
            return res.send({ message: "Id de categoria invalido" })
        if (body.userType === 'admin') {
            await CategoryController.delete({ _id: id });
            return res.json({ success: true, message: "Categoria eliminada" });
        } else {
            return res.json({ success: false, message: 'La categoria ya existe', status: 403 });
        }
    } catch (error) {
        console.error(error);
        return res.json({ success: false, error: 'Error al crear usuario' });
    }
});


module.exports = router;