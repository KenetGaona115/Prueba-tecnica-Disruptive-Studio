const express = require('express');
const router = express.Router();
const CategoryController = require('../database/controller/category.controller')
const { PERMISSIONS_MIDDLEWARE } = require('../middleware/permission')

/**
 * POST / (Crear nueva categoría)
 *
 * Este endpoint crea una nueva categoría, pero primero verifica si ya existe una categoría con el mismo nombre.
 * Utiliza middleware para verificar permisos antes de permitir la operación.
 *
 * Inputs:
 * - req.body: Un objeto que contiene los datos para crear una categoría, como `nombre` y `userType`.
 *
 * Outputs:
 * - res.json(): Devuelve un objeto JSON con una propiedad `success` (boolean) que indica si la operación tuvo éxito,
 *   y una propiedad `categoria` (objeto) que contiene información sobre la nueva categoría creada,
 *   o una propiedad `message` con información sobre errores.
 */
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

/**
 * PUT /:id? (Actualizar categoría por ID)
 *
 * Este endpoint actualiza una categoría existente por su ID. Incluye middleware para verificar permisos antes de permitir la operación.
 *
 * Inputs:
 * - :id : El ID de la categoría a actualizar. Puede ser proporcionado como parámetro de ruta o query.
 * - req.body: Un objeto que contiene los datos a actualizar en la categoría.
 *
 * Outputs:
 * - res.json(): Devuelve un objeto JSON con una propiedad `success` (boolean) que indica si la operación tuvo éxito,
 *   y una propiedad `categoria` (objeto) que contiene información sobre la categoría actualizada,
 *   o una propiedad `message` con información sobre errores o permisos.
 */
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

/**
 * GET / (Obtener todas las categorías)
 *
 * Este endpoint recupera todas las categorías de la base de datos y las devuelve como respuesta JSON.
 *
 * Inputs:
 * - No requiere parámetros específicos.
 *
 * Outputs:
 * - res.json(): Devuelve un objeto JSON con una propiedad `success` (boolean) que indica si la operación tuvo éxito,
 *   y una propiedad `categoria` (array) que contiene una lista de todas las categorías encontradas.
 */
router.get('/', async (req, res) => {
    try {
        const collection = await CategoryController.findAll();
        return res.json({ success: true, categoria: collection });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, error: 'Error al crear usuario' });
    }
});

/**
 * DELETE /:id? (Eliminar categoría por ID)
 *
 * Este endpoint elimina una categoría de la base de datos por su ID.
 * Incluye middleware para verificar permisos antes de permitir la operación.
 *
 * Inputs:
 * - :id : El ID de la categoría a eliminar. Puede ser proporcionado como parámetro de ruta o query.
 * - req.body.userType: El tipo de usuario, utilizado para verificar si tiene permisos de administrador.
 *
 * Outputs:
 * - res.json(): Devuelve un objeto JSON con una propiedad `success` (boolean) que indica si la operación tuvo éxito,
 *   y una propiedad `message` (string) que describe el resultado de la operación.
 */
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