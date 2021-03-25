import Router from 'express'
import {Client} from "../server.js";

//work with tours
const routerOrder = new Router()

routerOrder.get("/api/v1/order", async (req, res) => {
    try {
        const clients = await Client.find({})
        res.send(clients)
    } catch {
        res.status(404)
        res.send({error: "Client doesn't exist!"})
    }
})
routerOrder.get("/api/v1/order/:id", async (req, res) => {
    try {
        const id = req.params.id
        const client = await Client.findOne({_id: id})
        if (!id) {
            res.status(400)
            res.send({message: 'id не указан'})
        }
        res.send(client)
    } catch (e) {
        res.status(500)
        res.send({error: e})
    }
})
routerOrder.post("/api/v1/add/order", async (req, res) => {
    try {
        const client = await new Client({
            date: req.body.date,
            tourName: req.body.tourName,
            operator: req.body.operator,
            name: req.body.name,
            hotel: req.body.hotel,
            roomNumber: req.body.roomNumber,
            adult: req.body.adult,
            child: req.body.child,
            infant: req.body.infant,
            adultPrice: req.body.adultPrice,
            childPrice: req.body.childPrice,
            infantPrice: req.body.infantPrice,
            commission: req.body.commission,
            contact: req.body.contact,
            pickUpTime: req.body.pickUpTime,
            guide: req.body.guide,
            note: req.body.note
        })
        client.save()
        res.send(client)
    } catch (e) {
        res.status(500)
        res.send({error: e})
    }

})
routerOrder.put("/api/v1/update/order", async (req, res) => {
    try {
        const client = req.body
        if (!client._id) {
            res.status(400)
            res.send({message: 'id не указан'})
        }
        const updatedTour = await Client.findOneAndUpdate({_id: client._id}, client,
            {new: true, useFindAndModify: false})
        res.send(updatedTour)
    } catch (e) {
        res.status(500)
        res.send({error: e})
    }
})
routerOrder.delete("/api/v1/delete/order/:id", async (req, res) => {
    try {
        const id = req.params.id
        const client = await Client.findOneAndDelete({_id: id}, {useFindAndModify: false})
        if (!id) {
            res.status(400)
            res.send({message: 'id не указан'})
        }
        res.send(client)
    } catch {
        res.status(404)
        res.send({error: "Client doesn't exist!"})
    }
})

export default routerOrder;