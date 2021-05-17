import fs from 'fs';

import { Router } from 'express'
const router = Router()

let db = JSON.parse(fs.readFileSync('./employee.json', 'utf8'))

const saveDB = () => {
    fs.writeFileSync('./employee.json', JSON.stringify(db))
}

router.get('/getEmployees', (req, res) => {
    res.json(db)
})

router.delete('/removeEmployee/:id', (req, res) => {
    const id = req.params.id
    db = db.filter(el => el.id != id)
    saveDB()
    res.send(`Id: ${id} removed`)
})

router.post('/updateEmployee/', (req, res) => {
    const newUser = req.body
    const index = db.findIndex(el => el.id == newUser.id)
    db[index] = { ...newUser }
    saveDB()
    res.send(`Id: ${newUser.id} updated`)
})

/**
 * Gets json
 * Example:
 * {
        "name": "Clementina  Graham",
        "email": "Clementina@april.biz",
        "address": "Kattie Turnpike",
        "phone": "1-770-736-5033",
        "rate": 25
    }
 */
router.post('/createEmployee/', (req, res) => {
    const newUser = req.body
    const id = db[db.length - 1].id + 1
    const user = {
        id: id,
        ...newUser
    }
    db.push(user)
    saveDB()
    res.send(`Id: ${user.id} created`)
})

export default router