const express = require('express')
const router = express.Router()
const ChefController = require('../Controllers/chef-controller')
const upload = require('../middleware/storage');

router.route('/')
    .get(ChefController.getAll)
    /**
  * @swagger
 * /chef/:
 *   description: The utilisateurs managing API
 *   get:
 *     summary: Returns the list of all the utilisateurs
 *     tags: [chef]
*     responses:
 *       200:
 *         description: The list utilisateurs
 *         content:
 *           application/json:
 *       400:
 *         description: utilisateur error
 */

    .post(upload.single('image'), ChefController.add)
    .put(ChefController.edit)
    .delete(ChefController.delete)

    

router.delete('/all', ChefController.deleteAll)

/**
  * @swagger
 * /chef/all:
 *   description: user Registration
 *   delete:
 *     summary: Returns a message of success
 *     tags: [chef]
*     responses:
 *       201:
 *         description: The list utilisateurs
 *         content:
 *           application/json:
 *       400:
 *         description: utilisateur error
 */

module.exports = router
