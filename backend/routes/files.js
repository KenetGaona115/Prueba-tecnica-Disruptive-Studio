const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const FileController = require('../database/controller/file.controller')
const destination = './uploads'
const fs = require('fs');
const { PERMISSIONS_MIDDLEWARE, PERMISSIONS_DELETE_MIDDLEWARE, PERMISSIONS_FILE_MIDDLEWARE } = require('../middleware/permission')

const storage = multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        req.filename = file.fieldname + '-' + uniqueSuffix + ext
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});
const upload = multer({ storage });
/**
 * POST / (Crear un nuevo archivo)
 *
 * Carga uno o varios archivos y crea un nuevo registro en la base de datos con información adicional.
 *
 * Inputs:
 * - files: Archivo a cargar, que se maneja con el middleware `upload.array('files')`.
 * - req.body.values: Un objeto JSON como cadena de texto que contiene información adicional para la creación del archivo.
 * 
 * Outputs:
 * - res.send(): Devuelve un objeto JSON con una propiedad `success` (boolean) que indica si la operación tuvo éxito o no,
 *   y una propiedad `message` (string) que describe el resultado de la operación.
 */
router.post('/', upload.array('files'), PERMISSIONS_FILE_MIDDLEWARE, async function (req, res) {
    try {
        const body = JSON.parse(req.body.values);
        const result = await FileController.create({ ...body, url: req.filename ? req.filename : body.url })
        return res.send({ success: true, message: "Imagen creada" });
    } catch (error) {
        console.log(error)
        return res.send({ success: false, message: error.message });
    }
})

/**
 * PUT /:id? (Actualizar un archivo)
 *
 * Este endpoint actualiza un archivo existente con la información proporcionada.
 *
 * Inputs:
 * - :id : El ID del archivo a actualizar. Puede ser proporcionado como parámetro de ruta o query.
 * - files: Archivo a cargar, manejado por el middleware `upload.array('files')`.
 * - req.body.values: Un objeto JSON como cadena de texto que contiene información adicional para actualizar el archivo.
 *
 * Outputs:
 * - res.send(): Devuelve un objeto JSON con una propiedad `success` (boolean) que indica si la operación tuvo éxito o no,
 *   y una propiedad `message` (string) que describe el resultado de la operación.
 */
router.put('/:id?', upload.array('files'), PERMISSIONS_FILE_MIDDLEWARE, async function (req, res) {
    try {
        const id = req.query.id
        const body = JSON.parse(req.body.values);
        const result = await FileController.update({ _id: id }, { ...body, url: req?.filename ? req.filename : body.url })
        return res.send({ success: true, message: "Actualizado" });
    } catch (error) {
        console.log(error)
        return res.send({ success: false, message: error.message });
    }
})

/**
 * GET /view/:url? (Obtener imagen por URL)
 *
 * Este endpoint recupera una imagen del servidor por su URL, la convierte a formato base64 y la devuelve como respuesta JSON.
 *
 * Inputs:
 * - :url : El nombre del archivo que se desea recuperar. Puede ser proporcionado como parámetro de ruta o query.
 *
 * Outputs:
 * - res.json(): Devuelve un objeto JSON con una propiedad `success` (boolean) que indica si la operación tuvo éxito o no,
 *   y una propiedad `data` (string, base64) que contiene los datos de la imagen en formato base64.
 */
router.get('/view/:url?', (req, res) => {
    try {
        const url = req.query.url;
        const imageData = fs.readFileSync(path.resolve(destination + '/' + url));
        const base64ImageData = Buffer.from(imageData).toString('base64');
        res.json({
            success: true,
            data: base64ImageData
        });
    } catch (error) {
        return res.send({ success: false, message: error.message });
    }
})

/**
 * GET /one/:id? (Obtener un archivo por ID)
 *
 * Este endpoint recupera un único archivo de la base de datos usando un ID.
 *
 * Inputs:
 * - :id : El ID del archivo a recuperar. Puede ser proporcionado como parámetro de ruta o query.
 *
 * Outputs:
 * - res.json(): Devuelve un objeto JSON con una propiedad `success` (boolean) que indica si la operación tuvo éxito,
 *   y una propiedad `content` (objeto) que contiene la información del archivo recuperado.
 */
router.get('/one/:id?', async (req, res) => {
    try {
        const id = req.query.id;
        const content = await FileController.findOne({ _id: id })
        return res.json({ success: true, content })
    } catch (error) {
        return res.send({ success: false, message: error.message });
    }
})

/**
 * GET /nombre/:nombre? (Buscar archivos por nombre)
 *
 * Este endpoint busca archivos cuyo título coincida con un patrón específico, utilizando expresiones regulares.
 *
 * Inputs:
 * - :nombre : El término de búsqueda para el título del archivo. Puede ser proporcionado como parámetro de ruta o query.
 *
 * Outputs:
 * - res.json(): Devuelve un objeto JSON con una propiedad `success` (boolean) que indica si la operación tuvo éxito,
 *   y una propiedad `collection` (array) que contiene una lista de archivos que coinciden con el término de búsqueda.
 */
router.get('/nombre/:nombre?', async (req, res) => {
    try {
        const query = req.query.nombre
        const searchRegExp = query.replace(/\s/g, '\\s*');
        const collection = await FileController.findAll({ $and: [{ titulo: { $regex: new RegExp(searchRegExp, "i") } },] });
        return res.json({ success: true, collection })
    } catch (error) {
        console.log(error)
        return res.send({ success: false, message: error.message });
    }
})

/**
 * GET /:tema? (Obtener archivos por temática)
 *
 * Este endpoint busca archivos por temática. Si no se proporciona un tema específico, devuelve todos los archivos.
 *
 * Inputs:
 * - :tema : El tema o categoría por la cual buscar archivos. Puede ser proporcionado como parámetro de ruta o query.
 *
 * Outputs:
 * - res.json(): Devuelve un objeto JSON con una propiedad `success` (boolean) que indica si la operación tuvo éxito,
 *   y una propiedad `collection` (array) que contiene una lista de archivos según el criterio de búsqueda.
 */
router.get('/:tema?', async (req, res) => {
    try {
        const query = req.query.tema
        let collection
        if (query) {
            collection = await FileController.findAll({ tematica: query })
        } else {
            collection = await FileController.findAll()
        }
        return res.json({ success: true, collection })
    } catch (error) {
        console.log(error)
        return res.send({ success: false, message: error.message });
    }
})

/**
 * DELETE /:id?:email? (Eliminar un archivo por ID)
 *
 * Este endpoint elimina un archivo de la base de datos basado en su ID. Incluye un middleware para verificar permisos de eliminación.
 *
 * Inputs:
 * - :id : El ID del archivo que se desea eliminar. Puede ser proporcionado como parámetro de ruta o query.
 *
 * Outputs:
 * - res.json(): Devuelve un objeto JSON con una propiedad `success` (boolean) que indica si la operación tuvo éxito.
 */
router.delete('/:id?:email?', PERMISSIONS_DELETE_MIDDLEWARE, async (req, res) => {
    try {
        const id = req.query.id
        await FileController.delete({ _id: id })
        return res.json({ success: true })
    } catch (error) {
        console.log(error)
        return res.send({ success: false, message: error.message });
    }
})

module.exports = router;

