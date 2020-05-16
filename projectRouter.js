const express = require('express')

const db = require("./data/helpers/projectModel")
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const projects = await db.get()
        if (projects) { return res.status(200).json(projects) }
        res.status(404).json({ message: 'Where did the data go?' })
    } catch(e) {
        res.status(500).json({ message: 'uh oh' })
    }
})

router.post('/', async (req, res) => {
    const body = req.body
    try {
        const project = await db.insert(body)
        if (project) { return res.status(201).json(project) }
        res.status(400).json({ message: 'yikes! Check your code, mate.' })
    } catch(e) {
        res.status(500).json({ message: 'Ah-choo!!!!!' })
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const body = req.body
    try {
        const project = await db.update(id, body)
        if (project) { return res.status(201).json(project) }
        res.status(400).json({ message: 'yikes! Check your code, mate.' })
    } catch(e) {
        res.status(500).json({ message: 'Ah-choo!!!!!' })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const amountDeleted = await db.remove(id)
        if (amountDeleted > 0) { return res.status(201).json(amountDeleted) }
        res.status(400).json({ message: 'yikes! Check your code, mate.' })
    } catch(e) {
        res.status(500).json({ message: 'Ah-choo!!!!!' })
    }
})

module.exports = router