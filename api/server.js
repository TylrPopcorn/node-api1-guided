// IMPORTS AT THE TOP
const express = require('express');
const Dogs = require('./dog-model');

// INSTANCE OF EXPRESS APP
const server = express();

// GLOBAL MIDDLEWARE
server.use(express.json()); //Or else you wont recieve json request body fields or watever.

// ENDPOINTS
server.get('/test1', (req, res) => {
    res.send('deez nuts your way')
})


// [GET]    /             (Hello World endpoint)
server.get('/', (req, res) => {
    res.json({ hello: "world" })
})
// [GET]    /api/dogs     (R of CRUD, fetch all dogs)
server.get('/api/dogs', (req, res) => {
    Dogs.findAll()
        .then(result => {
            res.json(result)
        })
        .catch(() => {
            res.status(500).jaon({ message: "Something odd happened" })
        })
})

// [GET]    /api/dogs/:id (R of CRUD, fetch dog by :id)
server.get('/api/dogs:id', (req, res) => {
    Dogs.findById(req.params.id)
        .then(result => {
            if (result === undefined) {
                res.status(404).json({ message: "dog not found" })
            } else {
                res.json(result)
            }
        })
})
// [POST]   /api/dogs     (C of CRUD, create new dog from JSON payload)
server.post('/api/dogs', (req, res) => {
    Dogs.create(req.body)
        .then(result => {
            res.status(201).json(result) //201 means object was created.?
        })
})
// [PUT]    /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
server.put('/api/dogs:id', (req, res) => {
    Dogs.update(req.params.id, req.body)
        .then(result => {
            if (result == null) {
                res.status(404).json({ message: "dog not found" })
            } else {
                res.status(200).json(result);
            }
        })
        .catch(() => {
            res.status(500).json({ message: "something happened" })
        })

})
// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)
server.delete('/api/dogs:id', (req, res) => {
    Dogs.delete(req.params.id)
        .then(result => {
            if (result == null) {
                res.status(404).json({ message: "dog not found!" })
            } else {
                res.json(result);
            }
        })
        .catch(() => {

            res.status(500).json({ message: "something happened" })
        })

})

// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server
