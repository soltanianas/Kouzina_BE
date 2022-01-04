const express = require('express')
const router = express.Router()
const OrderController = require('../Controllers/order-controller')

router.route('/')
    .get(OrderController.getAll)
    .post(OrderController.add)
    .delete(OrderController.delete)
/**
  * @swagger
 * /order/:
 *   description: The utilisateurs managing API
 *   get:
 *     summary: Returns the list of all the utilisateurs
 *     tags: [order]
*     responses:
 *       200:
 *         description: The list utilisateurs
 *         content:
 *           application/json:
 *       400:
 *         description: utilisateur error
 */



   /**
  * @swagger
 * /order/:
 *   description: user Login
 *   post:
 *     summary: Returns a message of success
 *     tags: [order]
 *     parameters:
 *       - in: body
 *         name: type
 *         type: string
 *       - in: body
 *         name: emplacement
 *         type: string
 *       - in: body
 *         name: plat
 *         type: string
*     responses:
 *       200:
 *         description: The list utilisateurs
 *         content:
 *           application/json:
 *       400:
 *         description: utilisateur error
 */



    
router.delete('/all', OrderController.deleteAll)



/**
  * @swagger
 * /order/all:
 *   description: user Registration
 *   delete:
 *     summary: Returns a message of success
 *     tags: [order]
*     responses:
 *       201:
 *         description: The list utilisateurs
 *         content:
 *           application/json:
 *       400:
 *         description: utilisateur error
 */

router.patch('/:id', OrderController.makeFavourite)




router.get('/favourite', OrderController.getfavourite)
/**
  * @swagger
 * /order/favourite:
 *   description: The utilisateurs managing API
 *   get:
 *     summary: Returns the list of all the utilisateurs
 *     tags: [order]
*     responses:
 *       200:
 *         description: The list utilisateurs
 *         content:
 *           application/json:
 *       400:
 *         description: utilisateur error
 */



module.exports = router
