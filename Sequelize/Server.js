const con = require('./config')
const express = require('express')
const app = express()
const port = 5000;

//  asynchronous // pomise , async await // s
// 
// .catch()

app.use(express.json());

app.get('/user', async (req, res) => {

    try {
        const q1 = "SELECT * FROM user"

        const k = await con.query(q1)
        res.send({ response: k })

    } catch (err) {
        res.send({ error: err.send })
    }
})

app.get('/user/:xyz', async (req, res) => {

    try {
        const filter = [req.params.xyz]

        const q1 = "SELECT * FROM user WHERE id = ?"
        con.query(q1, filter, (err, result) => {
            if (err) {
                console.log(err.sqlMessage)
            } else {
                res.send(result)
            }
        })
    } catch (err) {
        res.send({ response: err })

    }
})


app.get('/user/:xyz/:age', async (req, res) => {

    try {

        const filter = [req.params.xyz, req.params.age]

        const q1 = "SELECT * FROM user WHERE id = ?"
        con.query(q1, filter, (err, result) => {
            if (err) {
                console.log(err.sqlMessage)
            } else {
                res.send(result)
            }
        })
    } catch (data) {

    }
})