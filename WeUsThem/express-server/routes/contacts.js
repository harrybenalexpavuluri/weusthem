const router = require('express').Router()
const axios = require('axios')
const db = require('../database/db')

router.get('/', async function (req, res) {
    try {
        res.json({
            contacts: db.getData()
        })
    } catch (e) {
        console.log(e)
        res.status(500).send("Error.")
    }
})

router.post('/add', async function (req, res) {
    db.addData(req.body)

    try {
        res.json({
            contacts: db.getData()
        })
    } catch (e) {
        console.log(e)
        res.status(500).send("Error.")
    }
})

router.post('/delete', async function (req, res) {

    db.deleteData(req.body.id)

    try {
        return res.send({contacts: db.getData()})
    } catch (e) {
        console.log(e)
        res.status(500).send('Error.')
    }
})

router.post('/update', async function (req, res) {

    db.updateData(req.body.id, req.body.newData)

    try {
        return res.send({contacts: db.getData()})
    } catch (e) {
        console.log(e)
        res.status(500).send('Error.')
    }
})


module.exports = router