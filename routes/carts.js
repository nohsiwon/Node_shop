const express = require('express');
const router = express.Router();

const Cart = require('../schemas/cart.js');
const Goods = require('../schemas/goods.js');

router.get('/carts', async (req, res) => {
    const carts = await Cart.find({});
    // [{goodsId, quantity}]

    const goodsIds = carts.map((cart) => {
        return cart.goodsId;
    });

    const goods = await Goods.find({ goodsId: goodsIds });
    // find() 괄호안의 값이 해당하면 가져옴

    const results = carts.map((cart) => {
        return {
            quantity: cart.quantity,
            goods: goods.find((item) => item.goodsId === cart.goodsId),
        };
    });

    res.json({
        carts: results,
    });
});

module.exports = router;
