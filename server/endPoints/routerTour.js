import Router from 'express'
import {Tour} from "../server.js";

//work with tours
const routerTour = new Router();

routerTour.get("/api/v1/tours", async (req, res) => {
    try {
        const tours = await Tour.find({})
        res.send(tours)
    } catch {
        res.status(404)
        res.send({error: "Tour doesn't exist!"})
    }
})
routerTour.get("/api/v1/tours/:id", async (req, res) => {
    try {
        const id = req.params.id
        const tour = await Tour.findById({ _id: id })
        if(!id) {
            res.status(400)
            res.send({message: 'id не указан'})
        }
        res.send(tour)
    } catch (e) {
        res.status(500)
        res.send({error: e})
    }
})
routerTour.post("/api/v1/add/tours", async (req, res) => {
    try {
        const tour = await new Tour({
            tourTitle: req.body.tourTitle,
            tour: req.body.tour
        })
        tour.save()
        res.send(tour)
    } catch (e) {
        res.status(500)
        res.send({error: e})
    }

})
routerTour.put("/api/v1/update/tours", async (req, res) => {
    try {
        const tour = req.body
        if(!tour._id) {
            res.status(400)
            res.send({message: 'id не указан'})
        }
        const updatedTour = await Tour.findByIdAndUpdate(tour._id, tour, {new: true})
        res.send(updatedTour)
    } catch (e) {
        res.status(500)
        res.send({error: e})
    }
})
routerTour.delete("/api/v1/delete/tours/:id", async (req, res) => {
    try {
        const id = req.params.id
        const tour = await Tour.findByIdAndDelete({_id: id})
        if(!id) {
            res.status(400)
            res.send({message: 'id не указан'})
        }
        res.send(tour)
    } catch {
        res.status(404)
        res.send({error: "Tour doesn't exist!"})
    }
})


export default routerTour;