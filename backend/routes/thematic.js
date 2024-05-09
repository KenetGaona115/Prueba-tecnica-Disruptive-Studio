const express = require('express');
const router = express.Router();
const ThematicController = require('../database/controller/thematic.controller')
const { PERMISSIONS_MIDDLEWARE } = require('../middleware/permission')

/**
 * POST / (Crear nueva temática)
 *
 * Este endpoint crea una nueva temática en la base de datos, pero primero verifica si ya existe una temática con el mismo nombre.
 * Incluye un middleware para verificar permisos antes de permitir la operación.
 *
 * Inputs:
 * - req.body.nombre: El nombre de la nueva temática que se desea crear.
 * - req.body.categorias: Un arreglo de categorías asociadas a la temática.
 *
 * Outputs:
 * - res.json(): Devuelve un objeto JSON con una propiedad `success` (boolean) que indica si la operación tuvo éxito,
 *   y una propiedad `tema` (objeto) que contiene la temática creada, o una propiedad `message` con información adicional sobre la operación.
 */
router.post('/', PERMISSIONS_MIDDLEWARE, async (req, res) => {
    try {
        const body = req.body;
        const validate = await ThematicController.findOne({ nombre: body.nombre });
        if (validate)
            return res.json({ success: false, message: 'El tema ya existe' });
        const tematica = await ThematicController.create({ nombre: req.body.nombre, categorias: req.body.categorias });
        return res.json({ success: true, tema: tematica });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, error: 'Error al crear tematica' });
    }
});

/**
 * GET / (Obtener todas las temáticas)
 *
 * Este endpoint recupera todas las temáticas de la base de datos.
 *
 * Inputs:
 * - No requiere parámetros específicos.
 *
 * Outputs:
 * - res.json(): Devuelve un objeto JSON con una propiedad `success` (boolean) que indica si la operación tuvo éxito,
 *   y una propiedad `temas` (array) que contiene una lista de todas las temáticas encontradas.
 */
router.get('/', async (req, res) => {
    try {
        const collection = await ThematicController.findAll();
        return res.json({ success: true, temas: collection });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, error: 'Error al obtener tematicas' });
    }
});



module.exports = router;