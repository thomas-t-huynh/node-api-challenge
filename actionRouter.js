const express = require('express')

const db = require("./data/helpers/actionModel")
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const actions = await db.get()
        if (actions) { return res.status(200).json(actions) }
        res.status(404).json({ message: 'Where did the data go?' })
    } catch(e) {
        res.status(500).json({ message: 'uh oh' })
    }
})

router.post('/:project_id', async (req, res) => {
    const project_id = req.params.project_id
    const body = req.body
    try {
        const action = await db.insert({...body, project_id})
        if (action) { return res.status(201).json(action) }
        res.status(400).json({ message: 'yikes! Check your code, mate.' })
    } catch(e) {
        res.status(500).json({ message: 'Ah-choo!!!!!' })
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const body = req.body
    try {
        const action = await db.update(id, body)
        if (action) { return res.status(201).json(action) }
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