const express = require('express');
const router = express.Router();
const platController = require('../Controllers/plat-controller');
const upload = require('../middleware/storage');

router.route('/')
    .get(platController.getAll)
    
 /**
  * @swagger
 * /plat/:
 *   description: The utilisateurs managing API
 *   get:
 *     summary: Returns the list of all the utilisateurs
 *     tags: [Plats]
*     responses:
 *       200:
 *         description: The list utilisateurs
 *         content:
 *           application/json:
 *       400:
 *         description: utilisateur error
 */
    .post(upload.single('image'), platController.add)
    /**
  * @swagger
 * /plat/:
 *   description: user Login
 *   post:
 *     summary: Returns a message of success
 *     tags: [Plats]
 *     parameters:
 *       - in: body
 *         name: prix
 *         type: string
 *       - in: body
 *         name: description
 *         type: string
 *       - in: body
 *         name: description
 *         type: string
 *       - in: body
 *         name: composition
 *         type: string
*     responses:
 *       200:
 *         description: The list utilisateurs
 *         content:
 *           application/json:
 *       400:
 *         description: utilisateur error
 */

    .put(platController.edit)
    .delete(platController.delete)

router.delete('/all', platController.deleteAll)

/**
  * @swagger
 * /plat/all:
 *   description: user Registration
 *   delete:
 *     summary: Returns a message of success
 *     tags: [Plats]
*     responses:
 *       201:
 *         description: The list utilisateurs
 *         content:
 *           application/json:
 *       400:
 *         description: utilisateur error
 */


module.exports = router;
