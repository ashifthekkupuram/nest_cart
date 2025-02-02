import express from 'express'

const PORT = 8000

const app = express()

app.get('/', (req, res) => {
    return res.send({ success: true, message: 'API Working' })
})

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})