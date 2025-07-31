import express from 'express';
import { addToCart, remoevToCart, getCart } from '../Controllers/cartController.js';
import authMiddleware from '../Middleware/auth.js';

const cartRoute = express.Router();

cartRoute.post('/add', authMiddleware, addToCart);
cartRoute.post('/remove', authMiddleware, remoevToCart);
cartRoute.get('/data', authMiddleware, getCart);

export default cartRoute 