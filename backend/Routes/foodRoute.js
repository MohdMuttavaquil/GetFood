import express from 'express'
import { item, itemlist } from '../Controllers/FoodController.js'

const foodRoute = express.Router()

foodRoute.get('/itemlist', itemlist)
foodRoute.get('/item/:id', item)

export default foodRoute