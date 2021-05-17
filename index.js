import express from 'express';


import employeeRouter from './router/employee.js'

const app = express()

const PORT = process.env.port || 3000

app.use(express.json())

app.use(employeeRouter)

app.listen(PORT, () => {
    console.log(`Server started on port:${PORT}`)
})