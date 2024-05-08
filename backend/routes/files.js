const express = require('express');
const router = express.Router();

router.post('/file', async function (req, res) {
    const body = req.body;
    console.log(body)
    return res.send({ success: true, data: { name: "TEST" } });
})

module.exports = router;