const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const FileController = require('../database/controller/file.controller')
const destination = './uploads'
const fs = require('fs');

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

router.post('/', upload.array('files'), async function (req, res) {
    try {
        const body = JSON.parse(req.body.values);
        const result = await FileController.create({ ...body, url: req.filename ? req.filename : body.url })
        return res.send({ success: true, message: "Imagen creada" });
    } catch (error) {
        console.log(error)
        return res.send({ success: false, message: error.message });
    }
})

router.put('/:id?', upload.array('files'), async function (req, res) {
    try {
        const id = req.query.id
        console.log(id)
        const body = JSON.parse(req.body.values);
        console.log(body)

        const result = await FileController.update({ _id: id }, { ...body, url: req?.filename ? req.filename : body.url })
        return res.send({ success: true, message: "Actualizado" });
    } catch (error) {
        console.log(error)
        return res.send({ success: false, message: error.message });
    }
})

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

router.get('/one/:id?', async (req, res) => {
    try {
        const id = req.query.id;
        const content = await FileController.findOne({ _id: id })
        return res.json({ success: true, content })
    } catch (error) {
        return res.send({ success: false, message: error.message });
    }
})

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

router.delete('/:id?', async (req, res) => {
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

